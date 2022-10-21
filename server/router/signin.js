const express = require("express");
const dbconnect = require("../config/dbconnect");
const router = express.Router();
const signinSQL = require("../sql/signin");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("../utils/validate");

router.post("/", (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    dbconnect.query(signinSQL.searchAcc(phoneNumber), (_, result) => {
      if (isEmpty(result) || password != "111111") {
        res.send({
          error_code: 401,
          message: "PhoneNumber or password is incorrect",
        });
      } else {
        const id = result[0].id;
        const token = jwt.sign({ id }, "111111", {
          expiresIn: "10m",
        });
        res.send({ token, error_code: 0 });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
