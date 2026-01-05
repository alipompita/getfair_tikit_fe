import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState } from "react";
import { register } from "../api/auth.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import logo from "../assets/brand/logo.png";
import getfairLogo from "../assets/brand/getfair-logo.png";


library.add(fas, far, fab)



export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, comfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (password !== password_confirmation) {
                toast.error("Passwords do not match.");
                return;
            }

            const data = await register(name, email, password);
            console.log("Registration successful:", data);
            toast.success("Registration successful! Please log in.");
            navigate("/login");

            // success handling (redirect, etc.)
        } catch (error) {
            const response = JSON.parse(error.message);
            console.log("API Error Response:", response);
            const apiErrors = response?.errors;

            if (apiErrors) {
                // Loop through each field (email, password, etc.)
                Object.values(apiErrors).forEach((messages) => {
                    messages.forEach((message) => {
                        toast.error(message);
                    });
                });
            } else {
                // Fallback error
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "Registration failed"
                );
            }

            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-lg w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="tikit logo" className="w-40 h-auto drop-shadow-lg" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Signup</h1>
                    <p className="text-gray-600 text-center text-sm">Register a new account</p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FontAwesomeIcon icon="fa-user" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FontAwesomeIcon icon="fa-envelope" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <hr className="border-gray-200" />
                    <div className="relative">
                        <FontAwesomeIcon icon="fa-lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <FontAwesomeIcon icon="fa-lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="confirm_password"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                            onChange={(e) => comfirmPassword(e.target.value)}
                            required
                        />
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-black to-red-950 text-white py-2 rounded-xl hover:from-red-950 hover:to-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold shadow-lg"
                    >
                        <Loader loading={loading} />
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Social login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm mb-3">Or continue with</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-md" disabled={true}>
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </button>
                        <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-md" disabled={true}>
                            <FontAwesomeIcon icon={['fab', 'google']} />
                        </button>
                    </div>
                </div>

                {/* Register link */}
                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Sign In
                    </a>
                </p>

                {/* Footer */}
                <div className="flex justify-center mt-6">
                    <img src={getfairLogo} alt="Getfair logo" className="w-15 h-auto opacity-70" />
                </div>
            </div>
        </div>
    );
}
