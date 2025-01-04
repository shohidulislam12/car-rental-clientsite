import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { toast } from "react-toastify";


const ReviewCar = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [car, setCar] = useState(null);
const {user}=useContext(AuthContext)
    useEffect(() => {
        fetchCarDetails();
      }, []);
    
      const fetchCarDetails = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/singlecars/${id}`
          ); 
          setCar(data);
        } catch (error) {
          console.error("Error fetching car details:", error);
        }
      };
      const [userData,setUserdata]=useState([])
      useEffect(() => {
        if (user) {
          fetchMycars();
        }
      }, [user]);
    
      const fetchMycars = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
          setUserdata(data);
        } catch (error) {
          console.error("Error fetching user cars:", error);
          // Optional: You can show a notification or message to the user if there's an error
        }
      };



const handleSubmit= async (e)=>{
    e.preventDefault()
    const rating=e.target.rating.value
    if(rating>5){
        return toast.error('plese Rate us Out of 5')
    }
    const description=e.target.description.value
    const userEmail=user.email
    const carImage=car.carimgages
    const modal=car.modal
    const userPhoto= userData?.photo
    const formdata={rating,description,carid:id,carImage,userPhoto,userEmail,modal}
    //console.log(formdata)
    try {
        // Make the API call to save the car details
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/review`, formdata);
        //console.log(data); 
           toast.success("sucessFully added")
           navigate('/mybookings')
      } catch (error) {
        console.error('Error uploading car details:', error);
      }





}




    return (
        <div className="w-1/2 mx-auto border my-10 border-gray-400 bg-base-200"> 
             <form onSubmit={handleSubmit} className="card-body">
                <h2>Review : {car?.modal}</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ratings (0-5) </span>
          </label>
          <input type="number" name='rating' placeholder="rating 1 to 5" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 border border-gray-300 rounded"
      
            rows="4"
          />
        </div>
   <div>
    <button className="btn btn-outline">Submit</button>
   </div>

      </form>
        </div>
    );
};

export default ReviewCar;