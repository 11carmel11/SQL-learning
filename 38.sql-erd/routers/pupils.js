const router = require("express").Router(); // ".../pupils" router
const con = require("../index");

router.get("/:pupilId", (req, res) => {
  const { pupilId } = req.params;
  const sql = `SELECT * FROM pupils WHERE ID = ${pupilId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post("/new/pupil", (req, res) => {
  const { name, class: classNum, subjects } = req.body;
  let id;
  const sql = `INSERT INTO pupils(name, classes_id) VALUES (${name}, ${classNum})`;
  con.query(sql, (err) => {
    if (err) throw err;
  });

  con.query("SELECT * FROM pupils ORDER BY id DESC", (err, results) => {
    if (err) throw err;
    id = results[0].id;
  });

  for (const subject of subjects) {
    const subjQuery = `SELECT * FROM subjects WHERE subject = ${subject}`;
    let subjId;
    con.query(subjQuery, (err, results) => {
      if (err) throw err;
      subjId = results[0].id;
    });
    con.query(
      `INSERT INTO pupils_has_subjects VALUES (${id}, ${subjId})`,
      (err) => {
        if (err) throw err;
      }
    );
  }

  res.sendStatus(201);
});

router.put("/update/pupil/:pupilId", (req, res) => {
  const {
    body: { name, class: classNum, subjects },
    params: { pupilId },
  } = req;
  if (!!name) {
    const sql = `UPDATE pupils SET name = ${name} WHERE id = ${pupilId}`;
    con.query(sql, (err) => {
      if (err) throw err;
      res.sendStatus(202);
    });
  } else if (!!classNum) {
    const sql = `UPDATE pupils SET classes_id = ${Number(
      classNum
    )} WHERE id = ${pupilId}`;
    con.query(sql, (err) => {
      if (err) throw err;
      res.sendStatus(202);
    });
  } else {
    const sql = `DELETE FROM pupils_has_subjects WHERE pupil_id = ${pupilId}`;
    con.query(sql, (err) => {
      if (err) throw err;

      for (const subject of subjects) {
        con.query(
          `SELECT * from subjects WHERE subject = ${subject}`,
          (er, results) => {
            if (er) throw er;
            const { id } = results[0];
            con.query(
              `INSERT INTO pupils_has_subjects VALUES (${(pupilId, id)})`,
              (e) => {
                if (e) throw e;
              }
            );
          }
        );
      }
      res.sendStatus(202);
    });
  }
});

router.delete("/remove/pupil/:pupilId", (req, res) => {
  const { pupilId } = req.params;

  const sql = `
  DELETE FROM pupils WHERE id = ${pupilId};
  DELETE FROM pupils_has_subjects WHERE pupil_id = ${pupilId}
  `;

  con.query(sql, (err) => {
    if (err) throw err;
    res.sendStatus(202);
  });
});

module.exports = router;
