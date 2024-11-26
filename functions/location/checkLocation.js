'use strict';
import { onRequest } from "firebase-functions/https";
// Load MaxMind databases
import { cityDB } from "../maxmind/index.js";

export const checkLocation = onRequest(
    {
      cors: process.env.ALLOWED_ORIGINS,
      timeoutSeconds: 5
    },
    (req, res) => {
    const ip = req.query.ip;
    console.log("IP Address: ", ip);

    if (!ip) {
      return res.status(400).json({ error: "IP address is required" });
    }

    try {
      const cityInfo = cityDB.get(ip);

      if (!cityInfo) {
        return res.status(404).json({ error: "Location not found for the given IP" });
      }

      const result = {
        country: cityInfo.country?.names?.en || "Unknown",
        city: cityInfo.city?.names?.en || "Unknown",
        latitude: cityInfo.location?.latitude || "Unknown",
        longitude: cityInfo.location?.longitude || "Unknown",
      };

      return res.json(result);
    } catch (error) {
      console.error("Error fetching location:", error);
      return res.status(500).json({ error: "Error fetching location data" });
    }
});
