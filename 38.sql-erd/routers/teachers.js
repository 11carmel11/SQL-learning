const router = require("express").Router(); // ".../teachers" router
const con = require("../index");

// checked
router.get("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const sql = `SELECT * FROM teachers WHERE ID = ${teacherId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// checked
router.post("/new/teacher", (req, res) => {
  const { name, subjects } = req.body;
  const newTeacher = `("${name}")`;
  const sql = `INSERT INTO teachers (name) VALUES ${newTeacher}`;

  con.query(sql, (error) => {
    if (!!error) throw error;

    con.query(`SELECT * FROM teachers ORDER BY id DESC`, (err, results) => {
      if (!!err) throw err;
      let failed;

      for (const subject of JSON.parse(subjects)) {
        const subjQuery = `INSERT INTO subjects (subject, teachers_id) VALUES ("${subject}", ${results[0].id})`;

        con.query(subjQuery, (er) => {
          if (!!er) failed = er;
        });
      }

      if (!!failed) throw failed;
      res.sendStatus(201);
    });
  });
});

// checked
router.delete("/remove/teacher/:teacherId", (req, res) => {
  const { teacherId } = req.params;

  let subjectsQuery = `SELECT id FROM subjects WHERE teachers_id = ${Number(
    teacherId
  )}`;

  con.query(subjectsQuery, (error, results) => {
    if (!!error) throw error;
    let failed;

    for (const subject of results) {
      const { id } = subject;
      const subjQuery = `DELETE FROM pupils_has_subjects WHERE subject_id = ${Number(
        id
      )}`;

      con.query(subjQuery, (err) => {
        if (!!err) failed = err;
      });
    }

    if (!!failed) throw failed;

    subjectsQuery = `DELETE FROM subjects WHERE teachers_id = ${Number(
      teacherId
    )}`;

    con.query(subjectsQuery, (err) => {
      if (!!err) throw err;
      const sql = `DELETE FROM teachers WHERE id = ${Number(teacherId)}`;
      con.query(sql, (error) => {
        if (!!error) throw error;
        res.sendStatus(202);
      });
    });
  });
});

module.exports = router;
