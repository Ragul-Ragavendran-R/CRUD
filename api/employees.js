import mongoose from "mongoose";
import Employee from "../backend/models/Employee.js";

// MongoDB Connection with caching for serverless
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

// Serverless function handler
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        await connectDB();

        const { method } = req;
        const id = req.url.split("/").pop();

        switch (method) {
            case "GET":
                if (id && id !== "employees") {
                    const employee = await Employee.findById(id);
                    if (!employee) {
                        return res.status(404).json({ error: "Employee not found" });
                    }
                    return res.status(200).json(employee);
                } else {
                    const employees = await Employee.find({});
                    return res.status(200).json(employees);
                }

            case "POST":
                const newEmployee = await Employee.create(req.body);
                return res.status(201).json(newEmployee);

            case "PUT":
                const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!updatedEmployee) {
                    return res.status(404).json({ error: "Employee not found" });
                }
                return res.status(200).json(updatedEmployee);

            case "DELETE":
                const deletedEmployee = await Employee.findByIdAndDelete(id);
                if (!deletedEmployee) {
                    return res.status(404).json({ error: "Employee not found" });
                }
                return res.status(200).json({ message: "Employee deleted successfully" });

            default:
                res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
                return res.status(405).json({ error: `Method ${method} not allowed` });
        }
    } catch (error) {
        console.error("❌ Serverless function error:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
}
