import Belowbar from "../components/Belowbar";

export default function Dashboard(){
    return(
        <>
      <div className="w-full h-screen " style={{backgroundColor:"#1e1e21"}} >
        <div>
        <div className="flex  justify-center">
        <div className="w-80 mt-6 h-96 border rounded">
            <div className="flex">
            <div className="text-white w-10 h-10 border flex justify-center items-center text-xl bold  rounded-full mt-2 ml-2 bg-green-500">P</div>
            <div className="mt-3 ml-3 text-white text-xl">Parth Negi</div>
            </div>
            <div className="text-3xl mt-6 ml-4 text-white ">title</div>
            <div className="text-md  ml-4 text-white ">description</div>
           
        </div>
        
        </div>
        </div>
        <Belowbar/>
         </div>
        </>
    )
}