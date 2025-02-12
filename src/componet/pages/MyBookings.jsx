import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateInf from "./UpdateInf";
import { format, compareAsc } from "date-fns";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEye } from "react-icons/fa";
import { VscPreview } from "react-icons/vsc";
import useAxiousSecure from "../Hooks/useAxiousSecurity";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
const MyBookings= () => {
  const axiousSecure=useAxiousSecure()
  const {user}=useContext(AuthContext)
  const [cars,setcars]=useState([])
  const navigate=useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);
 // const [startDate, setStartDate] = useState(new Date())
  const [selectedCarId, setSelectedCarId] = useState('');
  const [endtDate, setEndtDate] = useState(new Date())
  const [bookingdate, BookingtDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
 const [isConfirm,setConfirm]=useState(false)
 const [editatedid,setEditedId]=useState('')

 const [getEditCar,setEditCar]=useState([])
  useEffect(()=>{
      fetchMycars()
  },[user])
//console.log("cars",cars)
  const fetchMycars= async ()=>{
    const {data}=await axiousSecure.get(`/bookinscar/${user?.email}`)
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

const handleDelete=(id)=>{

  Swal.fire({
    title: "Are you sure to Cancel?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel booking!"
  }).then(async(result) => {
    if (result.isConfirmed) {
//console.log(id)
//delete cars
try{
  const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/cancelBooking/${id}`)
  //console.log('Cancel success',data)
  Swal.fire({
    title: "Canceled!",
    text: "Booking has been canceled.",
    icon: "cancel"
  });
  toast.success('cansel booking Sucess')
  const myremaing = cars.filter((car) => car._id !==id);
 setcars(myremaing);
}
catch(error){
  //console.log("error ",error)
}


   
    }
  });
}
//console.log("cars",cars)
const handleUpdate = (id) => {
  //console.log("Selected car ID for update:", id);
  setSelectedCarId(id); // Set selected car ID
};



//edit booking modal

const handleEdit=id=>{
  setEditedId(id)
 // Find the clicked car directly from the `cars` array
 const clickedCar = cars.find((car) => car._id === id);

 // Check if the clickedCar exists
 if (clickedCar) {
   setEditCar(clickedCar);
 
 } else {
   console.error('Car not found with the given ID:', id);
 }

}
const handleConfirm=async (id)=>{

 setModalOpen(false)
  setConfirm(true)
handleEdit(id)
//console.log('booked car id is',id)
  if (endtDate.getTime() < startDate.getTime()) {
    toast.error("End date must be after the start date.");
    setConfirm(false)
    return;
  }
  //console.log("img",getEditCar.carimgages)
    const formData = {
      carId:getEditCar.carId,
      startDate:startDate,
      castomerEmail:user?.email,
      endDate: endtDate,
      carimgages:getEditCar.carimgages,
      wonerEmail:getEditCar.wonerEmail,
      modal:getEditCar.modal,
      dailyPrice:getEditCar.dailyPrice,
      status:"pending",
      bookingDate: bookingdate,
    };

  //console.log(" clicked card id",formData)
  //console.log("check id",id)
        try {
          // Make the API call to save the car details
          const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/updateBook/${id}`, formData);
          //console.log(data); 
          //console.log(formData); 
         fetchMycars()
            return toast.success("booking update confirm")
            
        }catch(error) {
          //console.log('Error uploading car details:', error);

          return toast.error(error.message);
        }


  //console.log("edited ID is",id)

  }



    return (
       <>
      {cars.length===0?
        <div className="text-center dark:text-white dark:bg-black h-screen my-10">
        <h2 className="text-xl font-semibold">You have no cars Booked.</h2>
        <p className="mt-4">
          Click <Link to="/available" className="text-blue-500 underline">here</Link> to add a car.
        </p>
      </div>: <div className="overflow-x-auto dark:text-white dark:bg-black mx-auto h-screen ">
       <div className="item text-center">
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
       <h2 className="my-10 text-xl font-bold">Your Booking Cars </h2>
<div tabIndex={0} role="button" className="btn dark:text-white btn-outline m-1">Sort Date</div>
<ul tabIndex={0} className="dropdown-content dark:text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortDate('desc')}>Newest First</button></li>
 <li><button onClick={()=>handleSortDate('asc')} >Oldest First</button></li>
</ul>
</div>
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
<div   tabIndex={0} role="button" className="btn btn-outline dark:text-white m-1">Sort By Price</div>
<ul tabIndex={0} className="dropdown-content dark:text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortPrice('asc')}>Lowest First</button></li>
 <li><button onClick={()=>handleSortPrice('desc')}>Highest First</button></li>
</ul>
</div>
       </div>
     <table className="table">
       {/* head */}
       <thead>
         <tr className="hover:bg-purple-100 dark:text-white">
           <th>
            
           </th>
           <th>Car Model</th>
           <th>All Date</th>
           <th>Daily RentalPrice</th>
           <th>Status</th>
           <th>Action</th>
           <th>Review</th>
         </tr>
       </thead>
       <tbody>
       
    {
     cars.map((car,i)=>
       <tr className="hover:bg-gray-400" key={car._id}>
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
       {car.dailyPrice}$
         
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
<button 
disabled={car.status === "accept" || car.status === "cancel"}
          onClick={() => { 
            setModalOpen(true); 
          handleEdit(car._id)
          }}
            className="btn dark:text-white btn-primary ">
              <MdEdit />

</button>

<button 
disabled={car.status === "accept" || car.status === "cancel"}
onClick={()=>handleDelete(car._id)} className="btn dark:text-white btn-square btn-outline">
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
<span> 
<NavLink   to={`/cardetails/${car?.carId}`} className='btn dark:text-white btn-square btn-outline'>
<FaEye />
</NavLink>
</span>


       </th>
  <th>
<NavLink  to={`/reviewcard/${car?.carId}`}
disabled={car.status === "pending" || car.status === "cancel"}
 className="btn btn-outline dark:text-white ">
<VscPreview />
</NavLink>
  </th>
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
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Booking Start Date</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Booking End date</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className='border p-2 rounded-md'
                selected={endtDate}
                onChange={date => setEndtDate(date)}
              />
            </div>

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
          <div className="my-10 p-10 mx-auto ">
           <h2 className="text-2xl font-semibold mx-auto">Show Your Booking Rate   </h2>
                 <BarChart width={600} height={300} data={cars}>
                   <XAxis dataKey="modal" stroke="#8884d8" />
                   <YAxis />
                   <Tooltip />
                   <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                   <Bar dataKey="dailyPrice" fill="#8884d8" barSize={30} />
                 </BarChart>
               </div>
   </div>
      }
       </>
    );
};

export default MyBookings;