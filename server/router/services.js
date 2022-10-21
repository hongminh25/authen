const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const serviceSQL = require("../sql/services");
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
  const { tendichvu, giadichvu } = req.query;

  dbconnect.query(
    serviceSQL.searchService(tendichvu, giadichvu),
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
