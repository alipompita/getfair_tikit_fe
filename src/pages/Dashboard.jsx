import React from "react";
import { getToken, getUser } from "../api/auth";
import { Navigate } from "react-router-dom";



export default function Dashboard() {
    const token = getToken();
    if (!token)
        return <Navigate to="/login" />;

    // const user = getUser();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <pre>
                {JSON.stringify(getUser(), null, 2)}
            </pre>
        </div>
    );
}