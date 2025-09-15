
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const res = await axios.get("http://localhost:3000/users");
//       const users = res.data;

//       const user = users.find((u) => u.email === values.email);

//       if (!user) {
//         toast.error("User not found. Please sign up.");
//         return;
//       }

//       if (user.password !== values.password) {
//         toast.error("Incorrect password.");
//         return;
//       }

//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Error logging in. Try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
//             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Please sign in to your account</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
//           {/* Gradient accent */}
//           <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
//           <div className="p-8 sm:p-10">
//             <Formik
//               initialValues={{ email: "", password: "" }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
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
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="mt-2 text-red-500 text-sm flex items-center gap-1"
//                     />
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
//                       placeholder="Enter your password"
//                       className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
//                     />
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="mt-2 text-red-500 text-sm flex items-center gap-1"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   >
//                     {isSubmitting ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Logging in...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-2">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                         </svg>
//                         Sign In
//                       </div>
//                     )}
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

// export default Login ;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, LogIn, Loader2, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/signUp');
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      const users = res.data;

      const user = users.find((u) => u.email === values.email);

      if (!user) {
        toast.error("User not found. Please sign up.");
        return;
      }

      if (user.password !== values.password) {
        toast.error("Incorrect password.");
        return;
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error logging in. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
  
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login</p>
        </div>

        {/* Form */}
        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit=  {handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1"> Email Address</label>
                <div className="relative">
                  <Field type="email" name="email" placeholder="you@example.com" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-sm"/>
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <div className="relative">
                  <Field type="password" name="password" placeholder="Enter password" className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-sm"/>
                  <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1"/>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                   Login
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
         <div className="text-center m-3 ">Don't have a account <button onClick={handleClick} className="cursor-pointer text-blue-600 hover:text-blue-800">Sign Up</button></div>
      </div>

     
    </div>
  );
};

export default Login;
