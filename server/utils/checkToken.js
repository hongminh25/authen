const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  try {
    if (typeof authHeader === "string") {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
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

module.exports = { checkToken };
