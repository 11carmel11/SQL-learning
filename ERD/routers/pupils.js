const router = require("express").Router(); // ".../pupils" router
const con = require("../index");

// checked
router.get("/:pupilId", (req, res) => {
  const { pupilId } = req.params;
  const sql = `SELECT * FROM pupils WHERE ID = ${pupilId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// checked
router.post("/new/pupil", (req, res) => {
  const { name, class: classNum, subjects } = req.body;

  const sql = `INSERT INTO pupils(name, classes_id) VALUES ("${name}", ${Number(
    classNum
  )})`;

  con.query(sql, (error) => {
    if (error) throw error;

    const allPupilsQuery = "SELECT * FROM pupils ORDER BY id DESC";

    con.query(allPupilsQuery, (err, results) => {
      if (err) throw err;

      const { id } = results[0];

      let failed;
      let innerFailed;

      for (const subject of JSON.parse(subjects)) {
        const subjQuery = `SELECT * FROM subjects WHERE subject = "${subject}"`;

        con.query(subjQuery, (er, subs) => {
          if (er) failed = er;

          const { id: subjId } = subs[0];

          const subjPupilsQuery = `INSERT INTO pupils_has_subjects VALUES (${id}, ${subjId})`;

          con.query(subjPupilsQuery, (e) => {
            if (e) innerFailed = e;
          });
        });
      }

      if (!!failed) throw failed;
      if (!!innerFailed) throw innerFailed;

      res.sendStatus(201);
    });
  });
});

// checked
router.put("/update/pupil/:pupilId", (req, res) => {
  const {
    body: { name, class: classNum, subjects },
    params: { pupilId },
  } = req;

  if (!!name) {
    const sql = `UPDATE pupils SET name = "${name}" WHERE id = ${Number(
      pupilId
    )}`;

    con.query(sql, (error) => {
      if (error) throw error;
      res.sendStatus(202);
    });
  } else if (!!classNum) {
    const sql = `UPDATE pupils SET classes_id = ${Number(
      classNum
    )} WHERE id = ${Number(pupilId)}`;

    con.query(sql, (error) => {
      if (error) throw error;
      res.sendStatus(202);
    });
  } else {
    const sql = `DELETE FROM pupils_has_subjects WHERE pupils_id = ${Number(
      pupilId
    )}`;

    con.query(sql, (error) => {
      if (error) throw error;

      let failed;
      let innerFailed;

      for (const subject of JSON.parse(subjects)) {
        const subjQuery = `SELECT * from subjects WHERE subject = "${subject}"`;

        con.query(subjQuery, (err, results) => {
          if (err) failed = err;

          const { id: subjId } = results[0];

          con.query(
            `INSERT INTO pupils_has_subjects VALUES (${Number(
              pupilId
            )}, ${Number(subjId)})`,
            (er) => {
              if (er) innerFailed = er;
            }
          );
        });
      }

      if (!!failed) throw failed;
      if (!!innerFailed) throw innerFailed;

      res.sendStatus(202);
    });
  }
});

// checked
router.delete("/remove/pupil/:pupilId", (req, res) => {
  const { pupilId } = req.params;

  const sql = `DELETE FROM pupils WHERE id = ${pupilId}`;

  con.query(sql, (error) => {
    if (error) throw error;

    const subsQuery = `DELETE FROM pupils_has_subjects WHERE pupils_id = ${pupilId}`;

    con.query(subsQuery, (err) => {
      if (err) throw err;

      res.sendStatus(202);
    });
  });
});

module.exports = router;
