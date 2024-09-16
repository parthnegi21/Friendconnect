import Belowbar from "../components/Belowbar";

export default function Myself(){
  
   
    


    return(<>
    <div className="w-full h-screen " style={{backgroundColor:"#1e1e21"}} >
        <div className="flex pt-5 pl-5">
      <div className="h-14 w-14 bg-green-500  border text-3xl text-white rounded-full flex justify-center items-center">P</div>
      <div>
      <div className="text-white text-xl ml-2">parth_negi</div>
      <div className="text-white text-md ml-2">Parth Negi</div>
      </div>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-xl text-white ml-32">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
      <button className="bg-gray-700 text-white h-8 w-24 rounded-xl mt-3 ml-20">log out</button>
     

    </div></div>
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