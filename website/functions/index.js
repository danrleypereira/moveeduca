/* eslint-disable max-len */
/* eslint-disable indent */

const sgMail = require("@sendgrid/mail");
const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const {setGlobalOptions} = require("firebase-functions/v2");

// Set the maximum instances to 10 for all functions
setGlobalOptions({maxInstances: 10});

const SGapiKey = defineSecret("sendgrid-apikey");

exports.sendEmail = onRequest({secrets: [SGapiKey]}, (request, response) => {
  const allowedOrigins = [
    "https://moveeduca.dwcorp.com.br",
    "https://moveeduca-org.firebaseapp.com",
  ];
  const origin = request.headers.origin;

  if (allowedOrigins.includes(origin)) {
    response.set("Access-Control-Allow-Origin", origin);
  } else {
    return response.status(403).send({error: "Forbidden"});
  }

  if (request.method !== "POST") {
    if (request.method === "OPTIONS") {
      response.set("Access-Control-Allow-Methods", "POST");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.set("Access-Control-Max-Age", "3600");
      return response.status(204).send("");
    }
    return response.status(405).send({error: "Method Not Allowed"});
  }

  const apiKey = SGapiKey.value();
  sgMail.setApiKey(apiKey);

  logger.info(`Form submitted by: ${request.body.email}`);
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "danrleywillian@gmail.com",
    from: `taurussoftwaredev@gmail.com`,
    subject: request.body.subject,
    text: `${request.body.name} wants you to contact through the 
      number ${request.body.phone} to talk about the 
      subject ${request.body.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
        <h2>Contact Request</h2>
        <p><strong>Name:</strong> ${request.body.name}</p>
        <p><strong>Email:</strong> ${request.body.email}</p>
        <p><strong>Phone:</strong> ${request.body.phone}</p>
        <p><strong>Subject:</strong> ${request.body.subject}</p>
        <p>They would like to discuss the above subject. Please reach out to them as soon as possible.</p>
      </div>
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      logger.info("Email sent");
      response.status(200).send({success: true, message: "Email Sent!"});
    })
    .catch((error) => {
      logger.error(error);
      response
        .status(500)
        .send({success: false, message: "Failed to send the email!"});
    });
});
