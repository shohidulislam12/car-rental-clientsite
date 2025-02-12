import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateInf from "./UpdateInf";
import { format, compareAsc } from "date-fns";
import { Link } from "react-router-dom";
import EditBookingMo from "./EditBookingMo";
import useAxiousSecure, { axiousSecure } from "../Hooks/useAxiousSecurity";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
const MyCars = () => {
  const axiousSecure=useAxiousSecure()
  const {user}=useContext(AuthContext)
  const [cars,setcars]=useState([])
const [startDate, setStartDate] = useState(new Date())
  const [selectedCarId, setSelectedCarId] = useState('');
  useEffect(()=>{
      fetchMycars()
  },[user])

  const fetchMycars= async ()=>{
    const {data}=await axiousSecure.get(`/cars/${user?.email}`)
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
        sortedCars.sort((a, b) => new Date(a.addDate) - new Date(b.addDate));
      } else if (type === "desc") {
        sortedCars.sort((a, b) => new Date(b.addDate) - new Date(a.addDate));
      }
      setcars(sortedCars);
    };

//end sorting

const handleDelete=(id)=>{
  Swal.fire({
    title: "Are you sure to Delete?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async(result) => {
    if (result.isConfirmed) {
//console.log(id)
//delete cars
try{
  const {data}=await axios.delete(`${import.meta.env.VITE_API_URL}/deletecars/${id}`)
  //console.log('delete success',data)
  Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
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

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  // Add more data as needed
];

    return (
       <>

      {cars.length===0?
        <div className="text-center dark:bg-black dark:text-white h-screen  my-10">
        <h2 className="text-xl font-semibold">You have no cars listed.</h2>
        <p className="mt-4">
          Click <Link to="/addcar" className="text-blue-500 underline">here</Link> to add a car.
        </p>
      </div>: <div className="overflow-x-auto dark:bg-black dark:text-white  h-screen mx-auto ">
       <div className="item text-center">
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
       <h2 className="my-10 text-xl font-bold">Your Added Cars </h2>
<div tabIndex={0} role="button" className="btn dark:text-white btn-outline m-1">Sort Date</div>
<ul tabIndex={0} className="dropdown-content dark:text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortDate('desc')}>Newest First</button></li>
 <li><button onClick={()=>handleSortDate('asc')} >Oldest First</button></li>
</ul>
</div>
         {/* sorting buton */}
       <div className="dropdown dropdown-bottom dropdown-end">
<div   tabIndex={0} role="button" className="btn dark:text-white btn-outline m-1">Sort By Price</div>
<ul tabIndex={0} className="dropdown-content dark:text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
 <li><button onClick={()=>handleSortPrice('asc')}>Lowest First</button></li>
 <li><button onClick={()=>handleSortPrice('desc')}>Highest First</button></li>
</ul>
</div>
       </div>
     
     <table className="table ">
       {/* head */}
       
       <thead>
         <tr className="dark:text-white">
           <th>
            
           </th>
           <th>Name</th>
           <th>Added Date</th>
           <th>Daily RentalPrice</th>
           <th>Status</th>
           <th>Booking Count</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
       
    {
     cars.map((car,i)=>
       <tr key={car._id}>
   {/* dailyPrice, availibility, features,reg_number, carimgages, location,  */}
       <th>
        <p>{i+1}</p>
       </th>
       <td>
         <div className="flex items-center gap-3">
           <div className="avatar">
             <div className="mask mask-squircle h-12 w-12">
               <img
                 src={car.carimgages}
                 alt="Avatar Tailwind CSS Component" />
             </div>
           </div>
           <div>
             <div className="font-bold">{car.modal}</div>
             <div className="text-sm opacity-50">{car.location}</div>
           </div>
         </div>
       </td>
       <td>
     { car.addDate&& format(new Date(car?.addDate),'P')}
         
       </td>
       <td>
       {car.dailyPrice}$
         
       </td>
       <td>{car.availibility}</td>
       <td>{car.bookingCount}</td>
       <th className="flex gap-3 items-center ">
   
       <label onClick={
        ()=>handleUpdate(car._id)
        
       } htmlFor="my_modal_6" className="btn dark:text-white btn-square btn-outline"><MdEdit /></label>


<button onClick={()=>handleDelete(car._id)} className="btn dark:text-white btn-square btn-outline">
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

     </tr>
     )
    }
        <UpdateInf startDate={startDate} carId={selectedCarId} fetchMycars={fetchMycars}></UpdateInf>
       </tbody>

     </table>
    
     <div className="my-10 p-10 mx-auto ">
      <h2 className="text-2xl font-semibold mx-auto">Show Your Booking Rate   </h2>
            <BarChart width={600} height={300} data={cars}>
              <XAxis dataKey="modal" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="bookingCount" fill="#8884d8" barSize={30} />
            </BarChart>
          </div>
     
   </div>
      }
       </>
    );
};

export default MyCars;