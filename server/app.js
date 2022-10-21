const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const employee = require("./router/employee");
const status = require("./router/status");
const statusBill = require("./router/statusBill");
const bill = require("./router/bill");
const customer = require("./router/customer");
const service = require("./router/services");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use("/employee", employee);
app.use("/bill", bill);
app.use("/status", status);
app.use("/status_bill", statusBill);
app.use("/customer", customer);
app.use("/service", service);

app.listen("5500", () => {
  console.log("Server listening on port 5500");
});
