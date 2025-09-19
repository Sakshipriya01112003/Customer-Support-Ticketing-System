import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const TicketForm = ({ onSubmit }) => {
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "Low",
      status: "Open",
    },
    validationSchema: Yup.object({
      title: Yup.string()
      .trim()
      .required("Title is required")
      .min(3,"Title must be at leat 3 characters long"),
      description: Yup.string()
      .trim()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters long"),
      priority: Yup.string().required("Priority is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const ticket = {
        ...values,
        id: uuidv4(),
        createdAt: new Date().toLocaleString(),
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/Tickets",
          ticket
        );
        setSubmittedTicket(response.data);
        
        // alert("Ticket created successfully!");
        navigate("/dashboard");
        resetForm();
        if (onSubmit) onSubmit(response.data);
      } catch (error) {
        console.error("Error saving ticket:", error);
        toast.error("Failed to create ticket", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="container mx-auto rounded-2xl bg-white shadow-xl p-8 w-full max-w-lg border border-gray-200">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
            🎫 Create Ticket
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input type="text" name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1"> Description </label>
              <textarea name="description" value={formik.values.description} onChange={formik.handleChange}
                onBlur={formik.handleBlur} required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Priority
              </label>
              <select name="priority" value={formik.values.priority} onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              {formik.touched.priority && formik.errors.priority && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.priority}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.status}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"><ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button type="submit" disabled={!formik.dirty || !formik.isValid} className={`w-full font-semibold px-6 py-3 rounded-lg shadow-md transition transform ${!formik.dirty || !formik.isValid ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
                Create Ticket
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;