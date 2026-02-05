import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Star, Mail, Phone, Calendar, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/apiConfig";

export default function RecruitmentBoard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setCandidates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await axios.delete(`${API_URL}/employees/${id}`);
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/candidates/edit/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/employees/${id}`, { status: newStatus });
      fetchCandidates();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const searchLower = searchTerm.toLowerCase();
  const filteredCandidates = Array.isArray(candidates) ? candidates.filter(candidate =>
    candidate.name?.toLowerCase().includes(searchLower) ||
    candidate.email?.toLowerCase().includes(searchLower) ||
    candidate.department?.toLowerCase().includes(searchLower)
  ) : [];

  const groupedCandidates = {
    applied: filteredCandidates.filter(c => c.status === "applied"),
    shortlisted: filteredCandidates.filter(c => c.status === "shortlisted"),
    interview: filteredCandidates.filter(c => c.status === "interview")
  };

  const CandidateCard = ({ candidate }) => (
    <div
      className="bg-white rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 relative"
      onMouseEnter={() => setHoveredCard(candidate._id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{candidate.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{candidate.department}</p>
        </div>
        <div className="relative">
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <MoreVertical size={16} />
          </button>

          {/* Dropdown Menu */}
          {hoveredCard === candidate._id && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => handleEdit(candidate._id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(candidate._id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => handleStatusChange(candidate._id, "applied")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Move to Applied
              </button>
              <button
                onClick={() => handleStatusChange(candidate._id, "shortlisted")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Move to Shortlisted
              </button>
              <button
                onClick={() => handleStatusChange(candidate._id, "interview")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Move to Interview
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Rating & AI Score */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1">
          <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
          <span className="text-sm font-semibold text-gray-900">{candidate.rating || 4.0}</span>
        </div>
        {candidate.aiScore && (
          <div className="text-xs font-semibold">
            <span className="text-indigo-600">AI {candidate.aiScore}%</span>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail size={13} className="text-gray-400" />
          <span className="text-xs">{candidate.email}</span>
        </div>
        {candidate.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={13} className="text-gray-400" />
            <span className="text-xs">{candidate.phone}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar size={12} />
          <span className="text-xs">
            {new Date(candidate.createdAt || Date.now()).toISOString().split('T')[0]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {candidate.skills && (
            <span className="px-2 py-1 text-xs font-medium rounded bg-blue-50 text-blue-600">
              {candidate.skills}
            </span>
          )}
          {candidate.tagCount && (
            <span className="text-xs text-gray-500">{candidate.tagCount}</span>
          )}
        </div>
      </div>
    </div>
  );

  const Column = ({ title, count, candidates, dotColor }) => (
    <div className="flex-1 min-w-[300px] max-w-[400px]">
      <div className="bg-gray-100/80 rounded-xl p-4 h-full">
        {/* Column Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
          <h2 className="font-semibold text-gray-900 text-sm">{title}</h2>
          <span className="ml-auto bg-white px-2.5 py-0.5 rounded-md text-xs font-semibold text-gray-600">
            {count}
          </span>
        </div>

        {/* Cards Container */}
        <div className="space-y-0 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">
              No candidates
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-white mb-1">Recruitment Board</h1>
        <p className="text-white/60 text-sm">Manage candidate pipeline</p>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
          <Filter size={16} />
          <span>Filter</span>
        </button>

        <button
          onClick={() => navigate("/candidates/add")}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold shadow-sm"
        >
          Add Candidate
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-5 overflow-x-auto pb-4">
        <Column
          title="Applied"
          count={groupedCandidates.applied.length}
          candidates={groupedCandidates.applied}
          dotColor="bg-blue-500"
        />
        <Column
          title="Shortlisted"
          count={groupedCandidates.shortlisted.length}
          candidates={groupedCandidates.shortlisted}
          dotColor="bg-purple-500"
        />
        <Column
          title="Interview"
          count={groupedCandidates.interview.length}
          candidates={groupedCandidates.interview}
          dotColor="bg-pink-500"
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}