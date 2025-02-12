import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateInf from "./UpdateInf";
import { format, compareAsc } from "date-fns";
import { Link, NavLink } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import useAxiousSecure from "../Hooks/useAxiousSecurity";

const ManageCar= () => {
  const {user}=useContext(AuthContext)
  const [cars,setcars]=useState([])
  const axiousSecure=useAxiousSecure()
  const [isModalOpen, setModalOpen] = useState(false);
 // const [startDate, setStartDate] = useState(new Date())
  const [selectedCarId, setSelectedCarId] = useState('');
  const [endtDate, setEndtDate] = useState(new Date())
  const [bookingdate, BookingtDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
 const [isConfirm,setConfirm]=useState(false)
 const [editatedid,setEditedId]=useState('')
 const [isDDisable,setDisable]=useState(false)
  useEffect(()=>{
      fetchMycars()
  },[user])
//console.log("cars",cars)
  const fetchMycars= async ()=>{
    const {data}=await axiousSecure.get(`/managecar/${user?.email}`)
    setcars(data)
    }
    //sort by price
    const handleSortPrice = (type) => {
      const sortedCars = [...cars];
      if (type === "asc") {
        sortedCars.sort((a, b) => a.dailyPrice - b.dailyPrice);
      } else if (type === "desc") {
        sortedCars.sort((a, b) => b.dailyPrice - a.dailyPrice);
      }
      setcars(sortedCars); 
    };
    
    const handleSortDate = (type) => {
      const sortedCars = [...cars];
      if (type === "asc") {
        sortedCars.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
      } else if (type === "desc") {
        sortedCars.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      }
      setcars(sortedCars);
    };

//end sorting



const handlestatusChange=async(id,prevstatus,status)=>{
    console.table({id,prevstatus,status})
    // if(prevstatus===status||prevstatus==="accepted"){
    //   return setDisable(true)
    // }
    try{
      const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/bookStatusUpdate/${id}`,{status})
      //resresh ui
    fetchMycars()
    }
    catch(err){
        //console.log(err)
    }

}



    return (
       <>
      {cars.length===0?
        <div className="text-center h-screen my-10">
        <h2 className="text-xl font-semibold">No one Book Yours Car If Book Then You See and Manage All .</h2>
       
      </div>: <div className="overflow-x-auto h-screen  mx-auto ">
       <div className="item text-center">
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
       <h2 className="my-10 text-xl font-bold">Manage Your Cars </h2>
<div tabIndex={0} role="button" className="btn btn-outline m-1">Sort Date</div>
<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortDate('desc')}>Newest First</button></li>
 <li><button onClick={()=>handleSortDate('asc')} >Oldest First</button></li>
</ul>
</div>
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
<div   tabIndex={0} role="button" className="btn btn-outline m-1">Sort By Price</div>
<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortPrice('asc')}>Lowest First</button></li>
 <li><button onClick={()=>handleSortPrice('desc')}>Highest First</button></li>
</ul>
</div>
       </div>
     <table className="table">
       {/* head */}
       <thead>
         <tr className="hover:bg-purple-100">
           <th>
            
           </th>
           <th>Car Model</th>
           <th>All Date</th>
           <th>Booked By</th>
           <th>Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
       
    {
     cars.map((car,i)=>
       <tr className="hover:bg-blue-100" key={car._id}>
   {/* dailyPrice, availibility, features,reg_number, carimgages, location,  */}
       <th>
        <p>{i+1}</p>
       </th>
       <td>
         <div className="flex items-center gap-3">
           <div className="avatar">
             <div className="mask mask-squircle h-12 w-12">
               <img
                 src={car?.carimgages}
                 alt="Avatar Tailwind CSS Component" />
             </div>
           </div>
           <div>
             <div className="font-bold">{car?.modal}</div>
             <div className="text-sm opacity-50">{car?.location}</div>
           </div>
         </div>
       </td>
       <td>
       bookingDate: { 
  car.bookingDate && format(new Date(car?.bookingDate), "dd-MM-yyyy HH:mm")
}<br />
Rental Period Start:{ car.startDate&& format(new Date(car?.startDate),"dd-MM-yyyy HH:mm")} <br />
       Rental Period End: { car.endDate&& format(new Date(car?.endDate),"dd-MM-yyyy HH:mm")} <br />
         
       </td>
       <td>
       {car.castomerEmail}
         
       </td>
       <td>
  <span
    className={`badge ${car.status === "Confirmed" ? "badge-success" : 
      car.status === "Pending" ? "badge-warning" : 
      car.status === "Canceled" ? "badge-error" : "badge-neutral"}`}
  >
    {car.status}
  </span>
</td>
       <th className="flex gap-3 items-center ">
   
       {/* <label onClick={()=>setSelectedCarId(car._id)} htmlFor="my_modal_6" className="btn btn btn-square btn-outline"><MdEdit /></label> */}
       {/* accep */}
<button 

disabled={car.status === "accept" || car.status === "cancel"}
         onClick={()=>handlestatusChange(car._id,car.status,"accept")}
            className="btn  btn-primary ">
           <FcAcceptDatabase />

</button>
{/* reject */}
<button  
disabled={car.status === "accept" || car.status === "cancel"}
onClick={()=>handlestatusChange(car._id,car.status,"cancel")}
 className="btn btn-square btn-outline">
<svg
 xmlns="http://www.w3.org/2000/svg"
 className="h-6 w-6"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor">
 <path
   strokeLinecap="round"
   strokeLinejoin="round"
   strokeWidth="2"
   d="M6 18L18 6M6 6l12 12" />
</svg>
</button>



       </th>
   {    <UpdateInf fetchMycars={fetchMycars} user={user} carId={selectedCarId} ></UpdateInf>}
     </tr>
     )
    }
        
       </tbody>

     </table>
         {/* Booking Confirmation Modal */}
         {isModalOpen && (
        <div className="modal modal-open ">
          <div className="modal-box flex flex-col items-center">
            <h3 className="font-bold text-lg">Edit Your Booking</h3>


            <div className="modal-action">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-error"
              >
                Cancel
              </button>
              <button onClick={()=>handleConfirm(editatedid)} className="btn btn-success">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
     
   </div>
      }
       </>
    );
};

export default ManageCar;