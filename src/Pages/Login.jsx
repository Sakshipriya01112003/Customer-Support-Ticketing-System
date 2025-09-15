
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
