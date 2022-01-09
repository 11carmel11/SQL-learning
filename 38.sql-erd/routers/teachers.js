const router = require("express").Router(); // ".../teachers" router
const con = require("../index");

router.get("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const sql = `SELECT * FROM teachers WHERE ID = ${teacherId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post("/new/teacher", (req, res) => {
  const { name, subjects } = req.body;
  let id;
  const newTeacher = `(${name})`;
  const sql = `INSERT INTO teachers (name) VALUES ${newTeacher}`;

  con.query(sql, (err) => {
    if (err) throw err;
    con.query(`SELECT * FROM teachers ORDER BY id DESC`, (er, results) => {
      if (er) throw er;
      id = results[0].id;
    });
  });

  for (const subject of subjects) {
    const subjQuery = `INSERT INTO subjects (subject, teachers_id) VALUES (${
      (subject, id)
    })`;
    con.query(subjQuery, (er) => {
      if (er) throw er;
    });
  }

  res.sendStatus(201);
});

module.exports = router;
