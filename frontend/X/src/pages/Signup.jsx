import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    // Check if the user is already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const authtoken = localStorage.getItem("token");
            if (authtoken) {
                try {
                    const response = await axios.get("https://friendconnect-4.onrender.com/user/check", {
                        headers: {
                            "Authorization": `Bearer ${authtoken}`,
                            "Content-Type": "application/json",
                        }
                    });
                    if (response.status === 200) {
                        navigate("/dashboard");
                    }
                } catch (error) {
                    // Handle error if token is invalid or check fails
                    console.error('Token check error:', error);
                }
            }
        };
        checkAuth();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true); // Set loading to true

        try {
            const response = await axios.post('https://friendconnect-4.onrender.com/user/signup', formData);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error('Registration error:', error);
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };

    return (
        <div className="w-full pt-32 h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="text-white w-80 mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-white block text-sm font-medium">Email</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="text-white block text-sm font-medium">Name</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div className='flex justify-center'>
                        <div className="flex justify-center">Already have an account?</div>
                        <div onClick={() => navigate("/login")} className='ml-2 text-blue-300 hover:underline cursor-pointer'>Sign In</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
