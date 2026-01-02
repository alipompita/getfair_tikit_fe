import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState } from "react";
import { login } from "../api/auth.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import logo from "../assets/brand/logo.png";
import getfairLogo from "../assets/brand/getfair-logo.png";


library.add(fas, far, fab)



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await login(email, password);
            console.log("Login successful:", data);
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
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="tikit logo" className="w-60 mb-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Login</h3>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            <FontAwesomeIcon icon="fa-envelope" /> Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="type your registered email"
                            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            <FontAwesomeIcon icon="fa-lock" /> Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="type your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-sm text-gray-500 hover:text-red-500">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Loader loading={loading} />
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Social login */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm mb-2">Or Login Using</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700" disabled={true}>
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                        </button>
                        <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" disabled={true}>
                            <FontAwesomeIcon icon={['fab', 'google']} />
                        </button>
                    </div>
                </div>

                {/* Register link */}
                <p className="text-center text-gray-700 mt-6">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-red-500 hover:underline">
                        Register
                    </a>
                </p>

                {/* Footer */}
                <footer>
                    <div className="flex flex-col items-center">
                        <img src={getfairLogo} alt="tikit logo" className="w-20 mt-10" />
                    </div>
                </footer>
            </div>
        </div>
    );
}
