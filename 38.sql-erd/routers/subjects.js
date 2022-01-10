const router = require("express").Router(); // ".../subjects" router
const con = require("../index");

// checked
router.get("/:subjectId", (req, res) => {
  const { subjectId } = req.params;
  const sql = `SELECT * FROM subjects WHERE ID = ${subjectId}`;
  con.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

module.exports = router;
