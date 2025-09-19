import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const TicketItemRow = ({ ticket, onDelete }) => {
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

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:3000/Tickets/${ticket.id}`);
                  toast.success("Successfully deleted");
                  if (onDelete) onDelete(ticket.id);
                } catch (error) {
                  console.error("Error deleting ticket:", error);
                  toast.error("Failed to delete ticket");
                }
                closeToast();
              }}
            >Yes</button>
            <button className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={closeToast}
            >No</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const getPriorityStyle = (priority) => {
    switch ((priority || "").toLowerCase()) {
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
    switch ((status || "").toLowerCase()) {
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
    <tr className="hover:bg-gray-50">
      <td className="px-2 py-4 sm:py-6 whitespace-nowrap text-sm sm:text-base text-gray-700">
        {ticket.id}
      </td>
      <td className="px-4 py-4 sm:py-6 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getStatusStyle(ticket.status)}`}>
          {ticket.status}
        </span>
      </td>
      <td className="px-4 py-4 sm:py-6 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getPriorityStyle(ticket.priority)}`}>
          {ticket.priority} Priority
        </span>
      </td>
      <td className="px-4 py-4 sm:py-6 text-sm sm:text-base text-gray-900">
        {ticket.title}
      </td>
      <td className="px-4 py-4 sm:py-6 text-sm sm:text-base text-gray-600 line-clamp-2">
        {ticket.description}
      </td>
      <td className="px-4 py-4 sm:py-6 text-sm sm:text-base text-gray-600">
        <MdAccessTime className="inline-block mr-1 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
        {new Date(ticket.createdAt).toLocaleString()}
      </td>
      <td className="px-4 py-4 sm:py-6 whitespace-nowrap text-sm sm:text-base">
        <div className="flex flex-col gap-3 items-center flex-wrap ">
         <Tippy content="View">
           <button
            className="text-blue-600 hover:text-blue-900 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center cursor-pointer"
            onClick={handleView}
          >
            <FaEye className="w-full h-full" />
          </button>
         </Tippy>
         <Tippy content="Update">
           <button className="text-green-600 hover:text-green-900 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center cursor-pointer"
            onClick={handleUpdate}>
            <FaEdit className="w-full h-full" />
          </button>
         </Tippy>
          <Tippy content="Delete">
             <button className="text-red-600 hover:text-red-900 w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center cursor-pointer"
            onClick={handleDelete} >
            <FaTrashAlt className="w-full h-full" />
          </button>
          </Tippy>
          
        </div>
      </td>
    </tr>
  );
};

export default TicketItemRow;