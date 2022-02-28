const router = require("express").Router(); // ".../classes" router
const con = require("../index");

// checked
router.get("/:classId", (req, res) => {
  const { classId } = req.params;
  const sql = `SELECT * FROM classes WHERE ID = ${classId}`;
  con.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

// checked
router.put("/update/class/:classId", (_req, res) => {
  res.sendStatus(200); // empty func, nothing to update in classes table
});

module.exports = router;
