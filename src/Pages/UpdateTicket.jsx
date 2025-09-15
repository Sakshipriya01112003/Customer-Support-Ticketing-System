import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ClipboardEdit,Hash,Tag,CheckCircle,MessageSquare,Clock, X,Save,Plus, User,} from "lucide-react";

const UpdateTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};

  const [formData, setFormData] = useState({
    title: ticket?.title || "",
    description: ticket?.description || "",
    priority: ticket?.priority || "Low",
    status: ticket?.status || "Open",
    comments: ticket?.comments || [],
    newComment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (!formData.newComment.trim()) return;
    setFormData((prev) => ({
      ...prev,
      comments: [...prev.comments, prev.newComment],
      newComment: "",
    }));
  };

  // Save updates
const handleSubmit = async (e) => {
  e.preventDefault();
  toast(
    ({ closeToast }) => (
      <div className="flex flex-col space-y-2">
        <p>Are you sure you want to update this ticket?</p>
        <div className="flex gap-2 justify-end">
          <button onClick={async () =>
           {closeToast();
              try {
                const updatedTicket = {
                  ...formData,
                  createdAt: ticket.createdAt,
                  updatedAt: new Date().toLocaleString(),
                };

                await axios.put(`http://localhost:3000/Tickets/${ticket.id}`, updatedTicket);
                toast.success("Ticket updated successfully!");
                navigate(-1);
              } catch (error) {
                console.error("Error updating ticket:", error);
                toast.error("Failed to update ticket");
              }
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded">
            Confirm
          </button>
          <button onClick={() => {closeToast();}} className="px-3 py-1 bg-gray-300 text-black rounded">
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,        // do not auto-close, wait for user
      closeOnClick: false,     // prevent closing by click outside
      closeButton: false,      // remove default close button if you want
    }
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <ClipboardEdit className="w-6 h-6 text-blue-600" />
            Update Ticket
          </h1>
          <p className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-2">
            <Hash className="w-4 h-4 text-blue-500" />
            Ticket ID: {ticket?.id}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Tag className="w-4 h-4 text-gray-500" />
              Title
            </label>
            <input type="text" name="title"  value={formData.title} onChange={handleChange} placeholder="Enter ticket title..." className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required/>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Tag className="w-4 h-4 text-gray-500" />
                Priority
              </label>
              <select name="priority" value={formData.priority} onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <CheckCircle className="w-4 h-4 text-gray-500" />
                Status
              </label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <ClipboardEdit className="w-4 h-4 text-gray-500" />
              Description
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              rows="4" placeholder="Describe the issue..." className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-gray-700 font-semibold">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              Comments ({formData.comments.length})
            </label>

            {/* Add new comment */}
            <div className="flex gap-2 flex-wrap">
              <input type="text" name="newComment" value={formData.newComment} onChange={handleChange}
               placeholder="Write a comment..." className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
              <button type="button" onClick={handleAddComment} className="flex sm: justify-center items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Comment history */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.comments.map((c, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border text-sm">
                  <User className="w-5 h-5 text-blue-500" />
                  <p className="flex-1">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            Last updated: {new Date().toLocaleString()}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" onClick={() => navigate(-1)} className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button type="submit" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition" >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;