import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Myself() {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const userHandle = async () => {
            try {
                const authtoken = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/post/mypost", {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Content-Type": "application/json"
                    }
                });
                setUsers(response.data.posts || []);
                setData(response.data || {});
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        userHandle();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); 
    };

    return (
        <>
            <div className="w-full min-h-screen" style={{ backgroundColor: "#1e1e21" }}>
                <div className="flex pt-5 pl-5">
                    <div className="h-14 w-14 bg-green-500 border text-3xl text-white rounded-full flex justify-center items-center">P</div>
                    <div>
                        <div className="text-white text-xl ml-2">{data?.username || "name"}</div>
                        <div className="text-white text-md ml-2">{data?.name || "name"}</div>
                    </div>
                    <div>
                       
                        <button onClick={handleLogout} className="bg-gray-700 text-white h-8 w-24 rounded-xl mt-3 ml-20">Log out</button>
                    </div>
                </div>

                <div onClick={(()=>{
                    navigate("/post")
                })} className="w-full ml- h-12 flex justify-end pr-10 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" bg-green-500 rounded-full text-white size-10 hover:size-11 cursor-pointer">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg></div>


                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index} className="flex justify-center">
                            <div className="mt-10 w-80 mt-6 h-96 border rounded">
                                <div className="text-3xl mt-6 ml-4 text-white">{user.title}</div>
                                <div className="text-md ml-4 text-white">{user.description}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white text-2xl">No posts uploaded</div>
                )}

                <Belowbar />
            </div>
        </>
    );
}
