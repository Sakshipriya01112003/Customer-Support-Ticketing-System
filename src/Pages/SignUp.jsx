import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2,Mail, Lock, User, Users, PlusCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    role: Yup.string().oneOf(["admin", "user"], "Select a valid role").required("Role is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      if (values.role === "admin") {
        const adminExists = users.some((u) => u.role === "admin");
        if (adminExists) {
          toast.error("An admin already exists. Please choose User role.");
          return;
        }
      }

      const emailExists = users.some((u) => u.email === values.email);
      if (emailExists) {
        toast.error("Email already registered");
        return;
      }

      await axios.post("http://localhost:3000/users", values);
      toast.success("Signup successful!");
      resetForm();
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error signing up. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <PlusCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">Create Account</h2>
          <p className="text-gray-500 text-sm">Join us and start managing your tickets</p>
        </div>

        {/* Form */}
        <Formik initialValues={{ email: "", password: "", role: "" }} validationSchema={validationSchema}
          onSubmit={handleSubmit} >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Field type="email" name="email" placeholder="I@example.com"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm"/>
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <div className="relative">
                  <Field type="password" name="password" placeholder="Enter password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm"/>
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Role</label>
                <div className="relative">
                  <Field as="select" name="role"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm bg-white">
                    <option value="">Select your role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Field>
                  <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (<div className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Creating...</div>) : (
                  <> <PlusCircle className="w-5 h-5" /> Create Account </>
                )}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center m-3 ">Already have an account ? <button onClick={handleClick} className="cursor-pointer text-blue-600 hover:text-blue-800">Login</button></div>
      </div>
    </div>
  );
};

export default Signup;