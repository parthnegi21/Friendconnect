import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Request() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors
    const navigate = useNavigate();

    // Fetch requests and handle authentication
    const handleRequest = async () => {
        const authtoken = localStorage.getItem("token");

        if (!authtoken) {
            navigate("/");
            return;
        }

        try {
            setLoading(true); // Set loading to true before fetching data
            const response = await axios.get("https://friendconnect-4.onrender.com/friend/incoming-request", {
                headers: {
                    Authorization: `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                },
            });
            setUsers(response.data.requests || []); 
        } catch (error) {
            console.error("Error fetching friend requests", error);
            setError("Failed to fetch requests. Please try again later.");
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        handleRequest();
    }, []);

    const handleResponse = async (userId, response) => {
        const authtoken = localStorage.getItem("token");

        try {
            await axios.post("https://friendconnect-4.onrender.com/friend/respond-request", {
                response,
                userId,
            }, {
                headers: {
                    Authorization: `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                },
            });
            handleRequest(); // Refresh requests after responding
        } catch (error) {
            console.error("Error responding to request", error);
            setError("Failed to respond. Please try again.");
        }
    };

    return (
        <div className="w-full h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="text-white text-3xl flex justify-center pt-4">Friend Requests</div>

            {loading && <div className="text-white text-xl text-center mt-5">Loading...</div>}
            {error && <div className="text-red-500 text-xl text-center mt-5">{error}</div>}

            <div className="flex justify-center mt-4">
                <button
                    onClick={handleRequest}
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg"
                >
                    Refresh
                </button>
            </div>

            <div className="flex justify-center pt-10">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className="w-80 flex h-32 border mt-10 rounded" style={{ backgroundColor: "rgb(49 49 51)" }}>
                            <div>
                                <div className="w-10 h-10 border rounded-full text-white flex justify-center items-center text-xl mt-2 ml-5 bg-green-500">
                                    {user.from.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-white text-xl mt-1 ml-2">{user.from.username}</div>
                                <div className="text-white text-md mt-1 ml-2">{user.fromname}</div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleResponse(user.from.id, "accepted")}
                                    className="bg-green-500 h-8 rounded-xl text-white w-28 mt-6 ml-16"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => handleResponse(user.from.id, "rejected")}
                                    className="bg-gray-500 h-8 rounded-xl text-white w-28 mt-4 ml-16"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-3xl text-white">No Pending requests</div>
                )}
            </div>

            <Belowbar />
        </div>
    );
}
