/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// npm run deploy --only functions:checkSSL

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require('cors')({ origin: true });
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Cloud Function to check SSL
exports.checkSSL = onRequest((request, response) => {
  // Use CORS middleware to allow cross-origin access
  cors(request, response, async () => {
    const domain = request.query.domain; // Get the domain from the query parameters

    // if (!domain) {
    //   // If no domain is provided, send a 400 error
    //   response.status(400).json({ error: 'Domain is required' });
    //   return;
    // }

    try {
      // Make a HEAD request to check SSL validity
        response.json({
          domain: 'domain',
          isValid: false,
          message: 'SSL certificate is not valid',
        });
    } catch (error) {
      // Handle errors (e.g., domain not reachable, invalid SSL)
      response.json({
          domain: 'domain',
          isValid: false,
          message: 'SSL certificate is not valid',
        });
    }
  });
});
