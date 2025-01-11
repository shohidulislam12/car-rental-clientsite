import { formatDistanceToNow } from "date-fns";
import { NavLink } from "react-router-dom";


const CarsInf = ({car}) => {

const {_id, modal, dailyPrice, availibility, features, description, reg_number, carimgages,status,addDate, location, wonerEmail, wonerName, wonerPhoto}=car
    return (
       <>
        <NavLink to='/available' className=" overflow-hidden rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
     
     <img
       className=" p-4 mx-auto h-72  transform transition duration-500 hover:scale-105  object-cover"
       src={carimgages} 
       alt={modal}
     />

     <div className="px-4  py-4">
       <h2 className="text-2xl font-semibold text-gray-800">{modal}</h2>

       <p className="text-xl font-bold text-green-600">{dailyPrice}$/day</p>

       <span
         className={`inline-block py-1  gap-4 mx-3 px-3 mt-2 text-white text-sm font-semibold rounded-full ${
           car.availibility==="available" ? "bg-[#0056D2]" : "bg-gray-500"
         }`}
       >
         {car.availibility}
       </span>
       <span className="p-2 py-1 px-3 mt-2 bg-[#0056D2] text-white rounded-xl">
         boking:{car.bookingCount}
       </span>
       <NavLink
                    to={`/cardetails/${car._id}`}
                    className="text-blue-600 mx-3"
                  >
                    see more
                  </NavLink>

       <p className="text-sm text-gray-500 mt-2">Added  {formatDistanceToNow(new Date(addDate), { addSuffix: true })}</p>
     </div>
   </NavLink></>
    );
  };

export default CarsInf;