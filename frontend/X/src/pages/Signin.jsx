// SignIn.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
            const response = await axios.post('http://localhost:3000/user/signin', formData);
            
            if(response.data.token){
            localStorage.setItem("token",response.data.token)
            navigate("/details")
            }
            else{
                console.log(response.data.msg)
            }


        
           
        
    };

    return (
        <div className="w-full pt-52 h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="text-white w-80 mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="text-white block text-sm font-medium text-gray-700">username</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="username"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-white block text-sm font-medium text-gray-700">Password</label>
                        <input
                            style={{ backgroundColor: "#1e1e21" }}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                    <div className='flex justify-center'>
                        <div className="flex justify-center">Don't have an account?</div>
                        <div onClick={(()=>{
                            navigate("/signup")
                        })} className='ml-2 text-blue-300 hover:underline cursor-pointer'>Sign Up</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
