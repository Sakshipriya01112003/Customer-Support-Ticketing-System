// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Signup = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email format").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//     role: Yup.string().oneOf(["admin", "user"], "Select a valid role").required("Role is required"),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       const users = res.data;

//       if (values.role === "admin") {
//         const adminExists = users.some((u) => u.role === "admin");
//         if (adminExists) {
//           toast.error("An admin already exists. Please choose User role.");
//           return;
//         }
//       }

//       // check if email already exists
//       const emailExists = users.some((u) => u.email === values.email);
//       if (emailExists) {
//         toast.error("Email already registered");
//         return;
//       }

//       // add new user
//       await axios.post("http://localhost:3000/users", values);

//       toast.success("Signup successful!");
//       resetForm();
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error signing up. Try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
//           <p className="text-gray-600">Join us and start managing your tickets</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Gradient accent */}
//           <div className="h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          
//           <div className="p-8 sm:p-10">
//             <Formik
//               initialValues={{ email: "", password: "", role: "" }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {() => (
//                 <Form className="space-y-6">
//                   {/* Email Field */}
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                       <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                       </svg>
//                       Email Address
//                     </label>
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="Enter your email address"
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     />
//                     <ErrorMessage name="email" component="div" className="mt-2 text-red-500 text-sm flex items-center gap-1" />
//                   </div>

//                   {/* Password Field */}
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                       <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                       Password
//                     </label>
//                     <Field
//                       type="password"
//                       name="password"
//                       placeholder="Create a secure password"
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     />
//                     <ErrorMessage name="password" component="div" className="mt-2 text-red-500 text-sm flex items-center gap-1" />
//                   </div>

//                   {/* Role Dropdown */}
//                   <div className="group">
//                     <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
//                       <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       Role
//                     </label>
//                     <Field 
//                       as="select" 
//                       name="role" 
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     >
//                       <option value="">Select your role</option>
//                       <option value="admin">Admin</option>
//                       <option value="user">User</option>
//                     </Field>
//                     <ErrorMessage name="role" component="div" className="mt-2 text-red-500 text-sm flex items-center gap-1" />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50"
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                       </svg>
//                       Create Account
//                     </div>
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, User, Users, PlusCircle } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login')
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <PlusCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">Create Account</h2>
          <p className="text-gray-500 text-sm">Join us and start managing your tickets</p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm"
                  />
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm"
                  />
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Role</label>
                <div className="relative">
                  <Field
                    as="select"
                    name="role"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none text-sm bg-white"
                  >
                    <option value="">Select your role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Field>
                  <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating...
                  </div>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    Create Account
                  </>
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
