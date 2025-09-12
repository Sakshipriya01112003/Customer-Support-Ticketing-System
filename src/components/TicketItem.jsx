import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const TicketItem = ({ ticket, onDelete }) => {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);

  const handleView = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/Tickets/${ticket.id}`);
      setTicketData(res.data);
      navigate(`/view/${ticket.id}`, { state: { ticket: res.data } });
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/Tickets/${ticket.id}`);
      setTicketData(res.data);
      navigate(`/update/${ticket.id}`, { state: { ticket: res.data } });
    } catch (error) {
      console.error("Error fetching ticket:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/Tickets/${ticket.id}`);
      toast.success("Successfully deleted");
      onDelete(ticket.id);
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in progress":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "closed":
        return "bg-green-100 text-green-800 border-green-200";
      case "resolved":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl mt-6 rounded-2xl overflow-hidden max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
       <div className="p-6 sm:p-8">
          {/* First Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div className="flex-1">
           
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"> ID: {ticket.id}</span>
              <div className="flex gap-2">
                <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getPriorityStyle(ticket.priority)}`}>
                  {ticket.priority} Priority
                </span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-200">
              Title : {ticket.title}
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Description : {ticket.description}
          </p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MdAccessTime className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Created:</span>
              <span>{new Date(ticket.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            <button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50" onClick={handleView} >
              <span className="flex items-center justify-center gap-2">
                <FaEye className="w-4 h-4" />
                View Details
              </span>
            </button>

            <button className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50" onClick={handleUpdate}>
              <span className="flex items-center justify-center gap-2">
                <FaEdit className="w-4 h-4 " />
                Update
              </span>
            </button>

            <button className="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50" onClick={handleDelete} >
              <span className="flex items-center justify-center gap-2">
                <FaTrashAlt className="w-4 h-4 " />
                Delete
              </span>
            </button>
          </div>

      </div>
    </div>
  );
};

export default TicketItem;