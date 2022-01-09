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

module.exports = router;
