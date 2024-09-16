import { useEffect, useState } from "react";
import Belowbar from "../components/Belowbar";
import axios from "axios";
export default function Request(){
    const[users,setusers]=useState([])
  
  useEffect(()=>{
   
    const handlerequest=async()=>{
        const authtoken = localStorage.getItem("token")
        const response = axios.get("http://localhost:3000/friend/incoming-request",{
            headers:{
                "Authorization":`Bearer ${authtoken}`,
                "Content-Type": "application/json",

            }
        })
        setusers(response.data.requests)

    };
    handlerequest()
  },[])

    return(
        <>
        <div className="w-full h-screen " style={{backgroundColor:"#1e1e21"}} >
            <div className="text-white text-3xl flex justify-center pt-4">Friend Requests</div>
        <div className="flex justify-center pt-10  ">
         {users.length>0?(
            users.map((user,index)=>(
            <div kry={index} className="w-80 flex h-32 border mt-10 rounded " style={{backgroundColor:"rgb(49 49 51)"}}>
                <div>
                <div className="w-10 h-10 border rounded-full text-white flex justify-center items-center text-xl mt-2 ml-5 bg-green-500 ">P</div>
                <div className="text-white text-xl mt-1 ml-2">{user.username} </div>
                <div className="text-white text-md mt-1 ml-2">{user.name}</div>
                </div> 
                <div>
                <button className="bg-green-500 h-8 rounded-xl text-white w-28 mt-6 ml-16">Confirm</button>
                <button className="bg-gray-500 h-8 rounded-xl text-white w-28 mt-4 ml-16">Cancel</button>
                </div>
                
                </div>
                ))
            ):(
                <div className="text-3xl text-white">No Pending requests</div>
            )}

            </div>
            <Belowbar></Belowbar>
            </div></>
    )
}