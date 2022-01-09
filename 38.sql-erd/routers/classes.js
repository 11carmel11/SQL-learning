const router = require("express").Router(); // ".../classes" router
const con = require("../index");

router.get("/:classId", (req, res) => {
  const { classId } = req.params;
  const sql = `SELECT * FROM classes WHERE ID = ${classId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
