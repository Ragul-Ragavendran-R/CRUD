import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, User } from "lucide-react";
import API_URL from "../config/apiConfig";

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    rating: 4.0,
    aiScore: "",
    skills: "",
    status: "applied",
    photo: "" // Changed to empty string for JSON
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    // Note: Photo upload disabled for Vercel serverless compatibility until external storage is set up
    alert("Photo upload is temporarily disabled in this version. Data will be saved without photo.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending as JSON instead of FormData for better serverless function support
      await axios.post(`${API_URL}/employees`, form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("Candidate Added Successfully!");
      navigate("/candidates");
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert(`Failed to add candidate: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/candidates")}
          className="flex items-center gap-2 text-white mb-4 hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Board</span>
        </button>
        <h1 className="text-2xl font-bold text-white mb-1">Add New Candidate</h1>
        <p className="text-white/60 text-sm">Fill in candidate information</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Photo Upload Section */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Profile Photo
              </label>
              <div className="flex items-center gap-6">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-50">
                    <User className="text-gray-400" size={40} />
                  </div>
                )}
                <label className="cursor-pointer px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold flex items-center gap-2 shadow-sm">
                  <Upload size={16} />
                  Choose Photo
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Department & Phone */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position/Department <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  placeholder="Frontend Developer"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Status, Rating, AI Score */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white"
                >
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  AI Score (0-100)
                </label>
                <input
                  type="number"
                  name="aiScore"
                  value={form.aiScore}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="85"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skills/Tags
              </label>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, TypeScript"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">Separate multiple skills with commas</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm shadow-sm"
              >
                Add Candidate
              </button>
              <button
                type="button"
                onClick={() => navigate("/candidates")}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;