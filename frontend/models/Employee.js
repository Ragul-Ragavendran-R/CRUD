// models/Employee.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  photo: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  aiScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  skills: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'interview'],
    default: 'applied'
  }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);