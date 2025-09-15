import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trash, Edit, ArrowLeft, Tag, FileText, Calendar } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p>Are you sure you want to delete this ticket?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={async () => {
                closeToast();
                try {
                  await axios.delete(
                    `http://localhost:3000/Tickets/${ticket.id}`
                  );
                  toast.success("Successfully deleted");
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Error deleting ticket:", error);
                  toast.error("Failed to delete the ticket");
                }
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => closeToast()}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, closeButton: false }
    );
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-blue-500";
      case "in progress":
        return "bg-orange-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-purple-500";
    }
  };

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Ticket Data Found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Ticket Details
        </h1>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                <Tag className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-blue-700 font-medium text-sm">
                  Ticket ID: {ticket.id}
                </span>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${getStatusStyle(
                    ticket.status
                  )}`}
                >
                  {ticket.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${getPriorityStyle(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority} Priority
                </span>
              </div>
            </div>

            {/* Title + Date */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">
                      Title
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 break-words">
                      {ticket.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase">
                      Created At
                    </h4>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-purple-50 rounded-lg p-4 border overflow-x-auto">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 uppercase mb-1">
                    Description
                  </h3>
                  <p className=" text-gray-700 break-words whitespace-pre-line">{ticket.description}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <Edit className="w-4 h-4" />
                Update
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                <Trash className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
