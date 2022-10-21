const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const customerSQL = require("../sql/customer");
const { checkToken } = require("../utils/checkToken");
const { queryDB } = require("../utils/query");

// tương tự bill

router.get("/", checkToken, async (req, res) => {
  const { name, phoneNumber } = req.query;

  try {
    const customer = await queryDB(
      customerSQL.searchCustomer(name, phoneNumber)
    );
    res.send({ error_code: 0, data: customer, message: null });
  } catch (err) {
    res.send({ error: err });
  }
});

router.post("/", checkToken, (req, res) => {
  const { name, phoneNumber } = req.body;

  dbconnect.query(
    customerSQL.insertCustomer,
    { name, phoneNumber },
    (err, result) => {
      if (!name || !phoneNumber) {
        res.send({ error_code: 498, message: "Invalid data" });
      } else {
        if (err) throw err;
        res.send(result);
      }
    }
  );
});

router.put("/:id", checkToken, (req, res) => {
  const { name, phoneNumber } = req.body;

  dbconnect.query(
    customerSQL.updateCustomer(name, phoneNumber, req.params.id),
    (err, result) => {
      if (!name || !phoneNumber) {
        res.send({ error_code: 498, message: "Invalid data" });
      } else {
        if (err) throw err;
        res.send(result);
      }
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
