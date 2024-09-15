import Belowbar from "../components/Belowbar";

export default function Profile(){

    return(<>
    <div className="w-full h-screen " style={{backgroundColor:"#1e1e21"}} >
        <div className="flex pt-5 pl-5">
      <div className="h-14 w-14 bg-green-500  border text-3xl text-white rounded-full flex justify-center items-center">P</div>
      <div>
      <div className="text-white text-xl ml-2">parth_negi</div>
      <div className="text-white text-md ml-2">Parth Negi</div>
      </div>

    </div>
    <div className="text-white mt-5 ml-2 text-lg">difdfudfisdfudfdf</div>
    
    <div className="flex  justify-center">
        <div className=" mt-10 w-80 mt-6 h-96 border rounded">
            <div className="text-3xl mt-6 ml-4 text-white ">title</div>
            <div className="text-md  ml-4 text-white ">description</div>
           
        </div>
        
        </div>
        <Belowbar/>
    </div>
    </>)
}