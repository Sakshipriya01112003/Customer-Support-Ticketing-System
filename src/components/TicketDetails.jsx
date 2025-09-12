import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash, Edit, ArrowLeft, Tag, FileText, Calendar } from "lucide-react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useState } from "react";

const TicketDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};
  const [ticketData, setTicketData] = useState(null);

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
      navigate('/dashboard');
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-blue-500';
      case 'in progress':
        return 'bg-orange-500';
      case 'closed':
        return 'bg-gray-500';
      default:
        return 'bg-purple-500';
    }
  };

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-3"> No Ticket Data Found</h2>
          <button onClick={() => navigate(-1)} className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"> Go Back </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ticket Details</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="p-6 sm:p-8 lg:p-10">

              {/* First Row */}
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
              <div>
                <div className="flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
                  <Tag className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-semibold text-sm">Ticket ID: {ticket.id}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <span className={`flex items-center px-3 py-2 rounded-xl text-white font-semibold text-sm ${getStatusStyle(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className={`flex items-center px-3 py-2 rounded-xl text-white font-semibold text-sm ${getPriorityStyle(ticket.priority)}`}>
                  {ticket.priority} Priority
                </span>
              </div>
            </div>
     
      {/* Center */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Title */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className=" w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Title</h3>
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed">{ticket.title}</p>
                    </div>
                  </div>
                </div>


                  {/* Priority and createdAt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className=" w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                        <Tag className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 uppercase">Priority</h4>
                        <p className="text-lg font-bold text-gray-900">{ticket.priority}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className=" w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-600 uppercase ">Created At</h4>
                        <p className="text-lg font-semibold text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
           {/* Description */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className=" w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase  mb-3">Description</h3>
                      <p className="text-gray-700 ">{ticket.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

      {/* Buttons */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button onClick={() => navigate(-1)}
                  className="group flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-200 hover:border-gray-300 transform hover:scale-105 transition-all duration-200">
                  <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Back
                </button>

                <button onClick={handleUpdate} className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600  text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Edit className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Update
                </button>

                <button onClick={handleDelete}
                  className="group flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Trash className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;