const express = require("express");
const router = express.Router();
const { queryDB } = require("../utils/query");
const statusBillSQL = require("../sql/statusBill");

router.get("/", async (_, res) => {
  try {
    const statusBill = await queryDB(statusBillSQL.searchStatusBill());
    res.send({ error_code: 0, data: statusBill, message: null });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
