const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();

// tên tiếng việt thì tiếng việt hết tiếng anh thì tiếng anh hết
// sửa tương tự bill
// câu lệnh sql tách riêng 1 file
router.get("/", (_, res) => {
  let sql = "SELECT * FROM trang_thai_don";
  dbconnect.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
