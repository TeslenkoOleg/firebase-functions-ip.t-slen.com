'use strict';
// Import the required libraries
import { onRequest } from "firebase-functions/https";
import axios from "axios";

export const quickCheckSsl = onRequest(
    {
      cors: process.env.ALLOWED_ORIGINS,
      timeoutSeconds: 5
    },
    async (req, res) => {
      // Ensure the request is a GET request
      if (req.method !== 'GET') {
        res.status(405).json({error: 'Method Not Allowed'});
        return;
      }

      // Get the domain from query parameters
      const domain = req.query.domain;

      if (!domain) {
        res.status(400).json({error: 'Domain is required'});
        return;
      }

      try {
        // Make a HEAD request to check SSL validity
        const headResponse = await axios.head(`https://${domain}`);
        if (headResponse.status === 200) {
          res.status(200).json({
            domain,
            isValid: true,
            message: 'SSL certificate is valid',
          });
        } else {
          res.status(200).json({
            domain,
            isValid: false,
            message: 'SSL certificate is not valid',
          });
        }
      } catch (error) {
        res.status(200).json({
          domain,
          isValid: false,
          message: `Error checking SSL: ${error.message}`,
        });
      }
    });
