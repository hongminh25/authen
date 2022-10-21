const express = require("express");
const jwt = require("jsonwebtoken");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const billSQL = require("../sql/bill");

// dùng chung - chuyển sang utils
const query = (sql) =>
  new Promise((resolve, reject) => {
    try {
      dbconnect.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    } catch (error) {
      reject(error)
    }
  });

  // dùng chung - chuyển sáng utils
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  try {
    if (authHeader) { // điều kiện sai nếu authHeader không phải là 1 chuỗi sẽ chết server
      const token = authHeader.split(" ")[1];
      jwt.verify(token, "111111" , (err, data) => { // private key lấy từ 1 nguồn khác không phải điền trực tiếp
        if (err) throw err;
        req.id = data.id;
        next();
      });
    } else {
      res.send({ error_code: 498, message: "Token invalid" });
    }
  } catch (error) {
    res.send({ error_code: 498, message: "Token invalid" });
  }
};

router.get("/", checkToken, async (req, res) => { // không để / để 1 router cụ thể ví dụ: /add
  const { trangthaidonID, khachhangID, ngaythanhtoan, ngaynhanhang } =
    req.query;

    // chưa có try catch query đến api lỗi sẽ chết server
  let data = [];

  const bill = await query(
    billSQL.searchBill(trangthaidonID, khachhangID, ngaythanhtoan, ngaynhanhang)
  );

  for (const element of bill) {
    const billDetail = await query(
      billSQL.searchBillDetail(element.hoa_don_id)
    );
    for (const ele of billDetail) {
      let price = ele.soluong * ele.giadichvu; 
      element.tongtien += price; // nếu tổng tiền đang null hoặc undefined sẽ lỗi
    }
    data = [...data, { ...element, hdct: billDetail }];
  }

  res.send(data); // error_code = 0, data = data, message = null
});

router.post("/", checkToken, (req, res) => {
  const {
    ngaynhanhang,
    ngaytrahang,
    trangthaidonID,
    khachhangID,
    ngaythanhtoan, // không dùng bỏ đi
    listBillDetail,
  } = req.body;

  // validate dữ liệu yêu cầu trường nào phải có thì mới được thêm hóa đơn

  // chuyển sang dùng hàm query dựng sẵn
  dbconnect.query(
    billSQL.insertBill,
    {
      trangthaidonID,
      khachhangID,
      ngaythanhtoan: null, // không điền đặt cột trong db nullable sẽ tự sinh ra null không cần thêm vào
      ngaynhanhang,
      ngaytrahang,
      nhanvienID: req.id,
    },
    (err, result) => {
      if (err) throw err;
      for (let i = 0; i < listBillDetail.length; i++) {
        dbconnect.query(billSQL.insertBillDetail, {
          dichvuID: listBillDetail[i].dichvuID,
          soluong: listBillDetail[i].soluong,
          hoadonID: result.insertId,
        });
      }
      res.send(result); // error_code = 0, data = null, message = Thêm thành công hoặc Add success
    }
  );
});

// tương tự
router.put("/:id", checkToken, (req, res) => {
  const {
    trangthaidonID,
    khachhangID,
    ngaynhanhang,
    ngaythanhtoan,
    ngaytrahang,
    checkDelete,
  } = req.body;
  dbconnect.query(
    billSQL.updateBill(
      trangthaidonID,
      khachhangID,
      ngaythanhtoan,
      ngaynhanhang,
      ngaytrahang,
      checkDelete,
      req.params.id
    ),
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.delete("/:id", checkToken, (req, res) => {
  dbconnect.query(billSQL.deleteBill(req.params.id), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
