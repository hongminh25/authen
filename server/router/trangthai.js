const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();

// tên tiếng việt thì tiếng việt hết tiếng anh thì tiếng anh hết
// sửa tương tự bill
// câu lệnh sql tách sang 1 file riêng
router.get("/", (_, res) => {
  let sql = "SELECT * FROM trangthai";
  dbconnect.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
