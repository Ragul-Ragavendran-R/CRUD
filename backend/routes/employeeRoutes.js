// routes/employeeRoutes.js
import express from "express";
import upload from "../middleware/upload.js";
import Employee from "../models/Employee.js";

const router = express.Router();

// ➕ Add Employee
router.post("/", (req, res, next) => {
  // Check if request is JSON
  if (req.is('json')) {
    next(); // Skip upload middleware and go to handler
  } else {
    upload.single("photo")(req, res, next);
  }
}, async (req, res) => {
  try {
    console.log("Received data:", req.body);

    // Check for duplicate email before saving
    const existing = await Employee.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({
        message: "A candidate with this email address already exists.",
        code: "DUPLICATE_EMAIL"
      });
    }

    const employeeData = {
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
    };

    if (req.body.phone) employeeData.phone = req.body.phone;
    if (req.body.rating) employeeData.rating = parseFloat(req.body.rating);
    if (req.body.aiScore) employeeData.aiScore = parseInt(req.body.aiScore);
    if (req.body.skills) employeeData.skills = req.body.skills;
    if (req.body.status) employeeData.status = req.body.status;
    if (req.file) employeeData.photo = req.file.filename;

    const employee = new Employee(employeeData);
    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    console.error("Error creating employee:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({
      message: "An internal server error occurred while adding the candidate.",
      error: err.message
    });
  }
});

// 📄 Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get Single Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Employee
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    console.log("Update received data:", req.body); // Debug log
    console.log("Update received file:", req.file); // Debug log

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update only provided fields
    if (req.body.name !== undefined) employee.name = req.body.name;
    if (req.body.email !== undefined) employee.email = req.body.email;
    if (req.body.department !== undefined) employee.department = req.body.department;
    if (req.body.phone !== undefined) employee.phone = req.body.phone;
    if (req.body.rating !== undefined) employee.rating = parseFloat(req.body.rating);
    if (req.body.aiScore !== undefined) employee.aiScore = req.body.aiScore ? parseInt(req.body.aiScore) : null;
    if (req.body.skills !== undefined) employee.skills = req.body.skills;
    if (req.body.status !== undefined) employee.status = req.body.status;
    if (req.file) employee.photo = req.file.filename;

    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: err.message, details: err.stack });
  }
});

// ❌ Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;