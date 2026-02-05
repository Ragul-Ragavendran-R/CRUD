import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRoutes from "../backend/routes/employeeRoutes.js";

dotenv.config({ path: "../backend/.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("✅ Using existing MongoDB connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = db.connections[0].readyState === 1;
        console.log("✅ MongoDB connected for serverless function");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
};

// Routes
app.use("/api/employees", employeeRoutes);

// Serverless function handler
export default async function handler(req, res) {
    try {
        await connectDB();
        return app(req, res);
    } catch (error) {
        console.error("❌ Serverless function error:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
}
