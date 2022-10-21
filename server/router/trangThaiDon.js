const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();

router.get("/", (_, res) => {
  let sql = "SELECT * FROM trang_thai_don";
  dbconnect.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
