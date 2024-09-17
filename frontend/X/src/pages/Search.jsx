import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const authtoken = localStorage.getItem("token");

    useEffect(() => {
        if (!authtoken) {
            navigate("/");
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `https://friendconnect-4.onrender.com/user/bulk?filter=${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authtoken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.data) {
                    setUsers(response.data.users || []);
                }
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [filter, navigate, authtoken]);

    const handleSendRequest = async (userId, index) => {
        try {
            const response = await axios.post(
                "https://friendconnect-4.onrender.com/friend/send-request",
                { toUserId: userId },
                {
                    headers: {
                        Authorization: `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Re-fetch the user list after sending the request
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(
                        `https://friendconnect-4.onrender.com/user/bulk?filter=${filter}`,
                        {
                            headers: {
                                Authorization: `Bearer ${authtoken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.data) {
                        setUsers(response.data.users || []);
                    }
                } catch (error) {
                    console.log("Error fetching users:", error);
                }
            };

            fetchUsers();
        } catch (error) {
            console.log("Error sending friend request:", error);
        }
    };

    const getButtonStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-gray-500 text-white"; 
            case "accepted":
                return "bg-green-500 text-white"; 
            case "rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-orange-500 text-white"; 
        }
    };

    const getButtonText = (status) => {
        switch (status) {
            case "pending":
                return "Requested";
            case "accepted":
                return "Connected";
            case "rejected":
                return "Rejected";
            default:
                return "Send Request";
        }
    };

    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="flex justify-center">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-80 h-10 mt-5 pl-4 bg-gray-700 text-white text-xl rounded-2xl"
                    placeholder="Search"
                />
            </div>

            <div className="mt-10">
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div className="w-full flex justify-center" key={user._id}>
                            <div 
                                className="w-80 cursor-pointer flex flex-col items-center h-auto border mt-10 rounded p-4 space-y-3" 
                                style={{ backgroundColor: "rgb(49 49 51)" }}
                            >
                                <div className="w-12 h-12 border rounded-full text-white flex justify-center items-center text-xl bg-green-500">
                                    {user.name ? user.name[0] : "?"}
                                </div>

                                <div className="text-white text-xl">{user.username || "No Username"}</div>

                                <div className="text-white text-md">
                                    {user.name || "Name"}
                                </div>

                                <button
                                    onClick={() => handleSendRequest(user._id, index)}
                                    className={`h-8 rounded-xl w-28 ${getButtonStyle(user.status)}`}
                                    disabled={user.status !== "none"} 
                                >
                                    {getButtonText(user.status)}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white text-xl">No users found</div>
                )}
            </div>

            <Belowbar />
        </div>
    );
}
