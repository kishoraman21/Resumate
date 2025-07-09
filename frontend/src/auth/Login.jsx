import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message || "User logged in successfully");
      localStorage.setItem("token", data.token,);
      navigate("/resume");
      setEmail("");
      setPassword("");
    } catch (error) {
     toast.error(error.response?.data?.message || "Login failed");

    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ">
          <h2 className="text-black font-bold text-center mb-4 font-sans text-2xl">
            Login
          </h2>
          <form onSubmit={handleLogin}>
            {/* email */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Email{" "}
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded focus: outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* password */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Password{" "}
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded focus: outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
            >
              Login
            </button>
            <p className="text-center mt-4 text-gray-600">
              New user?{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline"
                to="/signup"
              >
                Signup
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
