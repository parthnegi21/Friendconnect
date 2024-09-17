import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Import your Loader component

export default function Post() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState(null);
    const [title, setTitle] = useState(""); // State for title
    const [description, setDescription] = useState(""); 
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); 

    useEffect(() => {
        const userHandle = async () => {
            setLoading(true); // Start loading
            try {
                const authtoken = localStorage.getItem("token");
                const response = await axios.get("https://friendconnect-4.onrender.com/post/mypost", {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Content-Type": "application/json"
                    }
                });
                setUsers(response.data.posts || []);
                setData(response.data || {});
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        userHandle();
    }, []);

    const autoGrow = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handlePost = async () => {
        setLoading(true); // Start loading
        try {
            const authtoken = localStorage.getItem("token");
            await axios.post("https://friendconnect-4.onrender.com/post/post", {
                title: title,
                description: description
            }, {
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json"
                }
            });
            navigate("/myself");
        } catch (error) {
            console.error("Error posting data:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <>
            {loading && <Loader />} {/* Show loader when loading */}
            <div className="w-full min-h-screen" style={{ backgroundColor: "#1e1e21" }}>
                <div className="flex justify-center">
                    <div className="text-white text-2xl">Post here</div>
                </div>
                <div className="flex justify-center">
                    <div className="mt-10 w-80 h-auto border rounded p-4 space-y-4" style={{ backgroundColor: "#313133" }}>
                        <textarea 
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add Title" 
                            className="text-xl pl-3 text-white bg-gray-700 rounded-xl w-full h-auto" 
                            onInput={autoGrow} 
                            style={{ minHeight: "40px", resize: "none" }} 
                        />
                        <textarea 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add Description"
                            className="text-xl rounded-xl bg-gray-700 w-full h-auto pl-3 text-white"
                            rows="6"
                            onInput={autoGrow} 
                            style={{ minHeight: "120px", resize: "none" }}
                        />
                        <button 
                            onClick={handlePost} // Call handlePost function on click
                            className="bg-green-500 text-white flex justify-center items-center w-12 rounded ml-60 text-lg"
                        >
                            Post
                        </button>
                    </div>
                </div>

                <Belowbar />
            </div>
        </>
    );
}
