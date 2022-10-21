const express = require("express");
const router = express.Router();
const { queryDB } = require("../utils/query");
const statusSQL = require("../sql/status");

router.get("/", async (_, res) => {
  try {
    const status = await queryDB(statusSQL.searchStatus());
    res.send({ error_code: 0, data: status, message: null });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
