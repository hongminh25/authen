const express = require("express");
const router = express.Router();
const serviceSQL = require("../sql/services");
const { checkToken } = require("../utils/checkToken");
const { queryDB } = require("../utils/query");

// tương tự bill

router.get("/", checkToken, async (req, res) => {
  const { tendichvu, giadichvu } = req.query;

  try {
    const service = await queryDB(
      serviceSQL.searchService(tendichvu, giadichvu)
    );
    res.send({ error_code: 0, data: service, message: null });
  } catch (err) {
    res.send({ error: err });
  }
});

module.exports = router;
