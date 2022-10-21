const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const customerSQL = require("../sql/customer");
const jwt = require("jsonwebtoken");

// tương tự bill
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

router.get("/", checkToken, (req, res) => {
  const { name, phoneNumber } = req.query;

  dbconnect.query(
    customerSQL.searchCustomer(name, phoneNumber),
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/", checkToken, (req, res) => {
  const { name, phoneNumber } = req.body;

  dbconnect.query(
    customerSQL.insertCustomer,
    { name, phoneNumber },
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.put("/:id", checkToken, (req, res) => {
  const { name, phoneNumber } = req.body;
  dbconnect.query(
    customerSQL.updateCustomer(name, phoneNumber, req.params.id),
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.delete("/:id", checkToken, (req, res) => {
  dbconnect.query(customerSQL.deleteCustomer(req.params.id), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
