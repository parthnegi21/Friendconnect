import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Search() {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

     
       
        const authtoken = localStorage.getItem("token");

        if (!authtoken) {
            navigate("/");
            return;
        }
        

        useEffect(()=>{
        const handleSubmit = async () => {
            const response = await axios.get(
                `http://localhost:3000/user/bulk?filter=${filter}`,
                
                {
                    headers: {
                        Authorization: `Bearer ${authtoken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data)

            if (response.data) {
                setUsers(response.data.users || []); 
                
            }
       else{
        console.log("wrong auth")
       }
    };handleSubmit()
},[filter])

   
return (
    <>
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
                        <div className="w-full flex justify-center ">
                        <div
                            key={index}
                            className="w-80 flex flex-col items-center h-auto border mt-10 rounded p-4 space-y-3" 
                            style={{ backgroundColor: "rgb(49 49 51)" }}
                        >
                           
                            <div className="w-12 h-12 border rounded-full text-white flex justify-center items-center text-xl bg-green-500">
                                {user.name ? user.name[0] : "?"}
                            </div>

                            
                            <div className="text-white text-xl">{user.username || "No Username"}</div>

                            
                            <div className="text-white text-md">
                                {user.name || "name"}
                            </div>

                            
                            <button className="bg-orange-500 h-8 rounded-xl w-28">
                                Send Request
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
    </>
);

}
