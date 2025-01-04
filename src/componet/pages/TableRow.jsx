import axios from "axios";
import { format, compareAsc } from "date-fns";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
const TableRow = ({i,handleUpdate,car,setcars}) => {

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

    return (
        <div>
               <tr >
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
                    ()=>handleUpdate(car)
                    
                   } htmlFor="my_modal_6" className="btn btn btn-square btn-outline"><MdEdit /></label>
            
            
            <button onClick={()=>handleDelete(car._id)} className="btn btn-square btn-outline">
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
        </div>
    );
};

export default TableRow;