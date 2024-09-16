// ProfileDetail.jsx
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Details = () => {
    const [formData, setFormData] = useState({
       
        profession: '',
        bio: ''
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

        const authtoken = localStorage.getItem("token")
        if(!authtoken){
            navigate("/")
        }
        
            const response = await axios.post('http://localhost:3000/user/details', {
                formData},
            {headers:{
                "Authorization":`Bearer ${authtoken}`,
                'Content-Type': 'application/json',
            }});
           
         
            if(response.data){
                navigate("/dashboard")
            }
        
    };

    return (
        <div className="w-full pt-16 h-screen bg-gray-900">
            <div className="text-white w-84  mx-auto p-10 border border-gray-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Profile Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   
                    <div>
                        <label htmlFor="profession" className="block text-sm font-medium text-gray-300">Profession</label>
                        <input
                            type="text"
                            id="profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300">bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Details;
