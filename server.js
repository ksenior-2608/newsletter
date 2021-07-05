const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us" + process.env.USER_NO,
});

app.use(bodyParser.json());

app.use(express.static("public"));

const subscribeRoute = require("./routes/subscribe");
const checkStatusRoute = require("./routes/checkStatus");
const unsubscribeRoute = require("./routes/unsubscribe");

app.use("/subscribe", subscribeRoute);
app.use("/status", checkStatusRoute);
app.use("/unsubscribe", unsubscribeRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up and running");
});
