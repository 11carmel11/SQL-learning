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

module.exports = router;
