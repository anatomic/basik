var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
var mailgun = require("mailgun-js")({
  apiKey: process.env.EMAIL_API_KEY,
  domain: process.env.EMAIL_DOMAIN,
});

var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isEmailValid = email => email && EMAIL_REGEX.test(email);
const isInputValid = input => input && input.length > 0;

const createEmailBody = ({ name, email, message }) => `
Email received from ${name} - ${email}

${message}
`;

app.post("/contact", function(req, res) {
  if (
    isEmailValid(req.body.email) === false ||
    isInputValid(req.body.message) === false
  ) {
    return res.status(400).json({
      success: false,
      error: "Valid email address and message are required",
    });
  }
  mailgun.messages().send(
    {
      from: "BASIK Website <website@basik.org.uk>",
      to: "ian+basik@ian-thomas.net",
      subject: "Contact from the BASIK website",
      text: createEmailBody(req.body),
    },
    (error, _) => {
      if (error) {
        return res
          .status(502)
          .json({ success: false, errors: ["Failed to send message"] });
      }
      return res.json({ success: true });
    }
  );
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
