import Belowbar from "../components/Belowbar";

export default function Search
(){

    return(
        <>
        <div className="w-full h-screen " style={{backgroundColor:"#1e1e21"}} >
            <div className="flex justify-center ">
               <input className="w-80 h-10 mt-5 pl-4 bg-gray-700 text-white text-xl rounded-2xl" placeholder="Search"/>

              
            </div>


               <div className="flex justify-center mt-10  ">
            <div className="w-80 flex h-32 border mt-10 rounded " style={{backgroundColor:"rgb(49 49 51)"}}>
                <div>
                <div className="w-10 h-10 border rounded-full text-white flex justify-center items-center text-xl mt-2 ml-5 bg-green-500 ">P</div>
                <div className="text-white text-xl mt-1 ml-2">parthnegi@21</div>
                <div className="text-white text-md mt-1 ml-2">(Parth Negi)</div>
                </div> 
                <button className="bg-orange-500 h-8 rounded-xl w-28 mt-12 ml-16">Send Request</button>
                
                </div>

            </div>
            <Belowbar></Belowbar>


        </div>
        </>
    )
}