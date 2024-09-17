import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Friends() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState("Send Request");

    const navigate = useNavigate();

    const authtoken = localStorage.getItem("token");

    if (!authtoken) {
        navigate("/");
        return;
    }

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/friend/friendlist",
                    {
                        headers: {
                            Authorization: `Bearer ${authtoken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
               
                setUsers(response.data.friends || []); 
            } catch (error) {
                console.error("Error fetching friend list", error);
            }
        };

        handleSubmit();
    }, []);

    return (
        <>
            <div className="w-full min-h-screen" style={{ backgroundColor: "#1e1e21" }}>
                <div className="text-white text-3xl flex justify-center pt-10">My friend list</div>

                <div className="pt-10">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div className="w-full flex justify-center" key={index}>
                                <div
                                    className="w-80 flex flex-col items-center h-auto border mt-10 rounded p-4 space-y-3"
                                    style={{ backgroundColor: "rgb(49 49 51)" }}
                                >
                                    <div className="w-12 h-12 border rounded-full text-white flex justify-center items-center text-xl bg-green-500">
                                        {user.username ? user.username[0].toUpperCase() : "?"}
                                    </div>
                                    <div className="text-white text-xl">{user.username || "No Username"}</div>
                                    <div className="text-white text-md">{user.name || "name"}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-xl flex justify-center">No friends found</div>
                    )}
                </div>

                <Belowbar />
            </div>
        </>
    );
}
