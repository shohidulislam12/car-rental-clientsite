import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "daisyui";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Auth/AuthProvider";
const CarDetails = () => {
  const { id } = useParams(); // Get car ID from URL
  const [car, setCar] = useState([]);
  const {user,loader}=useContext(AuthContext)
  const navigate=useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date())
  const [endtDate, setEndtDate] = useState(new Date())
  const [bookingdate, BookingtDate] = useState(new Date())
 const [isConfirm,setConfirm]=useState(false)
 //const [isConfirm,setConfirm]=useState(false)
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
  useEffect(() => {
    if (car?.wonerEmail === user?.email) {
      setConfirm(true); // Set confirm only once when the condition is true
    }
  }, [car, user]);
  if (!car) {
    return <div className="text-center py-10">Loading car details...</div>;
  }
const handleConfirm=async (id)=>{
//console.log('booked car id is',id)
setModalOpen(false)
setConfirm(true)
if (endtDate.getTime() <= startDate.getTime()) {
  toast.error("End date must be after the start date.");
  setConfirm(false)
  return;
}

const formData = {
  carId: id,
  startDate,
  castomerEmail:user?.email,
  endDate: endtDate,
  carimgages:car.carimgages,
  wonerEmail:car.wonerEmail,
  modal:car.modal,
  dailyPrice:car.dailyPrice,
  status:"pending",
  bookingDate: bookingdate,
};
////console.log(formData)
      try {
        // Make the API call to save the car details
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/booking`, formData);
        //console.log(data); 
        //console.log(formData); 
           toast.success("booking confirm")
           navigate('/mybookings')
      } catch(error) {
        console.error('Error uploading car details:', error);
      if(error.status===400){
        navigate('/mybookings')
       }
       return toast.error(error?.response?.data)
      }




}
if(loader){
  return <span className="loading loading-spinner loading-md"></span>
}
const available=car.availibility==='available'
console.log(car)
console.log("see", available)
console.log("see2",car.model)
  return (
    <div className="p-5 my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Car Images */}
        <div className="space-y-5">
          <img
            src={car.carimgages}
            alt={car.model}
            className="rounded-lg shadow-lg w-full"
          />
          {/* Additional Images Carousel */}
          <div className="carousel w-full">
            {car.additionalImages?.map((img, index) => (
              <div
                key={index}
                className="carousel-item w-full h-48 object-cover"
              >
                <img src={img} alt={`Car image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{car.modal}</h1>
          <p className="text-lg">
            <strong>Price Per Day:</strong> ${car.dailyPrice}
          </p>
          <p className="text-lg">
            <strong>Availability:</strong> {car.availibility}
          </p>
          {/* <p className="text-lg">
            <strong>Features:</strong>{" "}
            {car.features?.join(", ") || "No features listed"}
          </p> */}
          <p className="text-lg">
            <strong>Description:</strong> {car.description}
          </p>
          <div className="text-lg">
    <strong>Features:</strong>
    <ul className="list-disc pl-5">
      {car.featuresArray?.length > 0 ? (
        car.featuresArray.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))
      ) : (
        <li>No features available</li>
      )}
    </ul>
  </div>
 

        </div>
        {/* Car Details */}
        <div className="border border-gray-200 p-5" >
        
          <form  className="card-body">
          <h1 className="text-xl font-semibold mb-3">Subimt these form</h1>
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


      </form>
      <button 
          disabled={isConfirm || !available}
          onClick={() => setModalOpen(true)}
            className="btn w-full btn-primary mt-5 "
          >
            Book Now
          </button>

        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Your Booking</h3>
            <p>
              You are about to book <strong>{car.model}</strong> at{" "}
              <strong>${car.dailyPrice}/day</strong>.
            </p>
            <p>Availability: {car.availibility}</p>
            <div className="modal-action">
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-error"
              >
                Cancel
              </button>
              <button onClick={()=>handleConfirm(car._id)} className="btn btn-success">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
