import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check token validity on initial load
    useEffect(() => {
        const authtoken = localStorage.getItem("token");

        const checkToken = async () => {
            try {
                if (authtoken) {
                    const response = await axios.get("https://friendconnect-4.onrender.com/user/check", {
                        headers: {
                            Authorization: `Bearer ${authtoken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        navigate("/dashboard"); // Redirect if token is valid
                    }
                }
            } catch (error) {
                console.error("Invalid or expired token:", error);
                localStorage.removeItem("token"); // Clear invalid token
            }
        };

        checkToken();
    }, [navigate]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await axios.post('https://friendconnect-4.onrender.com/user/signin', formData);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard"); // Redirect to dashboard on success
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            setError("Sign-in failed, please try again.");
        }
    };

    return (
        <div className="w-full pt-52 h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="text-white w-80 mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white block text-sm font-medium">Username</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white block text-sm font-medium">Password</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        Sign In
                    </button>
                    <div className='flex justify-center mt-4'>
                        <div>Don't have an account?</div>
                        <div
                            onClick={() => navigate("/signup")}
                            className='ml-2 text-blue-300 hover:underline cursor-pointer'
                        >
                            Sign Up
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
