import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //response.data ke jagah direct data ko destructure krke use kie hai
      const { data } = await axios.post(
        "http://localhost:5000/user/signup",
        {
          username,
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
      toast.success(data.message || "User registered succesfully");
      localStorage.setItem("token", data.token)
      navigate("/login ")
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User registration failed");
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ">
          <h2 className="text-black font-bold text-center mb-4 font-sans text-2xl">
            Singup
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold" htmlFor="">
                Username{" "}
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded focus: outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
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
              Signup
            </button>
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline"
                to="/login"
              >
                Login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};