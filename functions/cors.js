import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

export const corsHandler = cors({
    origin: process.env.ALLOWED_ORIGINS.split(','), // Whitelisted origins
    methods: ['GET'],
});
