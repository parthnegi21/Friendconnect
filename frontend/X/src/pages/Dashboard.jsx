// Dashboard.jsx
import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
import Loader from "../components/Loader";  

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPosts = async () => {
            const authtoken = localStorage.getItem("token");
            try {
                const response = await axios.get("https://friendconnect-4.onrender.com/post/bulk", {
                    headers: {
                       "Authorization": `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                    },
                });

                setData(response.data.posts); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);  
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <Loader />;  

    return (
        <>
            <div className="w-full min-h-screen" style={{ backgroundColor: "#1e1e21" }}>
                <div>
                    <div className="text-2xl text-white flex justify-center mb-10 pt-5">Dashboard</div>
                    
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div className="flex justify-center" key={index}>
                                <div className="w-80 mt-6 h-96 border rounded">
                                    <div className="flex">
                                        <div className="text-white w-10 h-10 border flex justify-center items-center text-xl font-bold rounded-full mt-2 ml-2 bg-green-500">
                                            {item.name ? item.name[0] : "?"}
                                        </div>
                                        <div className="mt-3 ml-3 text-white text-xl">{item.name || "No Name"}</div>
                                    </div>
                                    <div className="text-3xl mt-6 ml-4 text-white">{item.title || "No Title"}</div>
                                    <div className="text-md ml-4 text-white">{item.description || "No Description"}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-center">No posts found</div>
                    )}
                </div>
                <Belowbar />
            </div>
        </>
    );
}
