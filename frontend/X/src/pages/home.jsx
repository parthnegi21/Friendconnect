import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const authtoken = localStorage.getItem("token");

            if (!authtoken) {
                navigate("/");
                return;
            }

            try {
                const response = await axios.get("http://localhost:3000/user/check", {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                    }
                });

                if (response.status === 200) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error during token check:", error);
                navigate("/");
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div className="w-full h-screen" style={{ backgroundColor: "#1e1e21" }}>
            <div className="flex justify-end">
                <button 
                    onClick={() => navigate("/signup")}
                    className="bg-orange-500 w-20 h-8 mr-2 mt-2 rounded-2xl shadow"
                >
                    Signup
                </button>
                <button 
                    onClick={() => navigate("/login")}
                    className="bg-orange-500 w-20 h-8 flex mr-2 mt-2 justify-center items-center rounded-2xl shadow"
                >
                    Log in
                </button>
            </div>
            <div className="flex justify-center text-center mt-60 text-4xl text-white">
                Welcome to FriendConnect
            </div>
            <div className="text-white flex justify-center text-center mt-40">
                FriendConnect lets you search for friends, send and receive friend requests, manage your connections, and share your thoughts with your network. Connect and engage effortlessly!
            </div>
        </div>
    );
}
