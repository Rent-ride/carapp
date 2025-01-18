"use client";
import React, { useEffect, useState } from "react";
import { useFirebase } from "@/Firebase/FirebaseContext";


function Login() {
  useEffect(() => {
    document.title = "Admin-Login | Rent-Ride";
  }, []);

  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [recoveryMail, setRecoveryMail] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const firebase = useFirebase();

  const handleChange = (e) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allerrors = {}
    if (!adminCredentials.email) allerrors.email = "Enter Email";
    if (!adminCredentials.password) allerrors.password = "Enter Password";
    if (Object.keys(allerrors).length > 0) {
      setErrorMessage(allerrors)
      return;
    }
    
      const user = firebase.manageAdmin(adminCredentials);
  
  };

  const handleResetPassword = (e) => {
    e.preventDefault();    
      firebase.resetPass(recoveryMail);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm mx-2 sm:mx-0">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          {showResetPassword ? "Reset Password" : "Login"}
        </h2>
        <form>
          {showResetPassword ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your email"
                  onChange={(e)=>setRecoveryMail(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={handleResetPassword}
                >
                  Send Email
                </button>
              </div>
              <div className="text-right">
                <button
                  className="text-base  text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={() => setShowResetPassword(false)}
                >
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {errorMessage.email ? (
                  <p className="text-base text-red-600 my-1">{errorMessage.email}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                {errorMessage.password ? (
                  <p className="text-base text-red-600 my-1">{errorMessage.password}</p>
                ) : null}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="text-right">
                <button
                  className="text-sm text-blue-600 hover:underline focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={() => setShowResetPassword(true)}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
