const express = require("express");
const jwt = require("jsonwebtoken");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const billSQL = require("../sql/bill");

const query = (sql) =>
  new Promise((resolve, reject) => {
    dbconnect.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, "111111", (err, data) => {
        if (err) throw err;
        req.id = data.id;
        next();
      });
    } else {
      res.send({ error_code: 498, error_msg: "Token invalid" });
    }
  } catch (error) {
    res.send({ error_code: 498, error_msg: "Token invalid" });
  }
};

router.get("/", checkToken, async (req, res) => {
  const { trangthaidonID, khachhangID, ngaythanhtoan, ngaynhanhang } =
    req.query;

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
      element.tongtien += price;
    }
    data = [...data, { ...element, hdct: billDetail }];
  }

  res.send(data);
});

router.post("/", checkToken, (req, res) => {
  const {
    ngaynhanhang,
    ngaytrahang,
    trangthaidonID,
    khachhangID,
    ngaythanhtoan,
    listBillDetail,
  } = req.body;

  dbconnect.query(
    billSQL.insertBill,
    {
      trangthaidonID,
      khachhangID,
      ngaythanhtoan: null,
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
      res.send(result);
    }
  );
});

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
