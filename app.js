//config .env
require('dotenv').config();

//acquiring package
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

//setting app to use bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

//setting app to use some static contents i.e. files which will automatically get rendered
app.use(express.static("public"));

//listening to dynamically allocated port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up and running");
});

//serving signup page on home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//handling user data
app.post("/", function (req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  //creating JSON obj for sending via API
  var data = {
    members: [{
      //keys used are as per host docs
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      },
    }]
  };

  //converting JSON obj in stringify form
  const jsonData = JSON.stringify(data);
  const url = "https://us" + process.env.USER_NO + ".api.mailchimp.com/3.0/lists/" + process.env.LIST_ID;

  //creating options obj for gaining access
  const options = {
    method: 'POST',
    auth: process.env.USER_NAME + ":" + process.env.API_KEY,
  };

  //making request instance for posting data
  const request = https.request(url, options, function (response) {

    //handling response send by api website
    var status = response.statusCode;

    //rendering page acc to status code
    if (status === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  //making request by passing data
  request.write(jsonData);

  //logging error
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
});

//retry request
app.post("/failure", function (req, res) {
  res.redirect("/");
})