import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState } from "react";
import { login, setAuth } from "../api/auth.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import logo from "../assets/brand/logo.png";
import getfairLogo from "../assets/brand/getfair-logo.png";


library.add(fas, far, fab)




export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await login(email, password);
            // console.log("Login successful:", data);
            if (data.token && data.user) {
                await setAuth(data.token, data.user);
                toast.success("Login successful!");
                navigate("/dashboard");
            }

            setLoading(false);
            // Handle successful login (e.g., store token, redirect)
        } catch (error) {
            toast.error("Login failed. Invalid Credentials.");
            console.error("Login error:", error);
            setLoading(false);
            // Handle login error (e.g., show error message)
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-lg w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="tikit logo" className="w-40 h-auto drop-shadow-lg" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600 text-center text-sm">Sign in to your account</p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
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

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-black to-red-950 text-white py-2 rounded-xl hover:from-red-950 hover:to-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold shadow-lg"
                    >
                        <Loader loading={loading} />
                        {loading ? "Signing in..." : "Sign In"}
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
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Sign up
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
