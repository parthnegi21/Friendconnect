// SignUp.jsx

import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            // Handle successful registration (e.g., redirect or show a message)
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle registration error (e.g., show an error message)
            console.error('Registration error:', error.response.data);
        }
    };

    return (
        <div className="w-full pt-32 h-screen " style={{backgroundColor:"#1e1e21"}} >
        <div className=" text-white w-80 mx-auto p-6 border border-gray-300 rounded-lg shadow-md" >
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="text-white block text-sm font-medium text-gray-700">Username</label>
                    <input style={{backgroundColor:"#1e1e21"}}
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="text-white block text-sm font-medium text-gray-700">Email</label>
                    <input style={{backgroundColor:"#1e1e21"}}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label  htmlFor="password" className="text-white block text-sm font-medium text-gray-700">Password</label>
                    <input style={{backgroundColor:"#1e1e21"}}
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign Up
                </button>
                <div className='flex justify-center'>
                <div className="flex justify-center"> Already have a Account? </div>
                <div className='ml-2 text-blue-300 underline'>Signin</div></div>
            </form>
        </div>
        </div>
    );
};

export default SignUp;
