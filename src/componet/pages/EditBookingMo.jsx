import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const  EditBookingMo = ({carId,fetchMycars}) => {

    const [car,setcars]=useState([])
    const navigate=useNavigate()
 
    useEffect(()=>{
        const fetchMycars1= async ()=>{
          const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/singlecars/${carId}`)
          setcars(data)
          }
          fetchMycars1()
      },[carId])

    const {_id, modal,bookingCount, dailyPrice, availibility, features, description, reg_number, carimgages,addDate, location, wonerEmail, wonerName, wonerPhoto}=car

    const {user}=useContext(AuthContext)
    const [availability, setAvailability] = useState();
const handleChange = (e) => {
    setAvailability(e.target.value);
  };
    const handleSubmit=async(e)=>{
     e.preventDefault()
     const form=e.target 
     const modal=form.model.value
     const dailyPrice=parseFloat(form.dailyPrice.value)
const availibility=availability
  //   const availibility=''
     const reg_number=form.reg_number.value
  
     const carimgages=form.imgages.value
     const features=form.features.value
     const location=form.location.value
     const description=form.description.value

     const wonerName=user?.displayName
     const wonerEmail=user.email
     const wonerPhoto=user?.photoURL
     const formData={modal,bookingCount,addDate,dailyPrice,availibility,features,description,reg_number,carimgages,location,wonerEmail,wonerName,wonerPhoto}
     //console.log(formData)

     try {
        // Make the API call to save the car details
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/updatecars/${_id}`, formData);
        //console.log(data); // Response from your backend
        toast.success('update success')
        fetchMycars()
        document.getElementById("my_modal_6").checked = false
      } catch (error) {
        console.error('Error uploading car details:', error);
      }
//console.log(formData)
     navigate('/mycars')
    };

    


    return (
        <div>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal w-full" role="dialog">
  <div className="modal-box w-[50%] p-0">


  <form onSubmit={handleSubmit} className="card-body  rounded-xl text-xl font-semibold   border shadow-xl mx-auto p-4  items-center">
        <div className="form-control ">
                    
          <label className="label">
            <span className="label-text">Car Model</span>
          </label>
          <input type="text" defaultValue={modal} name="model" placeholder="Car Model" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Daily Rental Price</span>
          </label>
          <input type="number" defaultValue={dailyPrice} name="dailyPrice" placeholder="Daily Rental Price (in $)" className="input input-bordered" required />
        </div>
        <div className="mb-4">
          <label htmlFor="availability"name="availibility" className="block font-medium">Availability</label>
          <select 
        name="availability"
        className="w-full p-3 border border-gray-300 rounded"
        value={availability}
        onChange={handleChange}
        required
      >
        <option value="">Select Availability</option>
        <option value="available">Available</option>
        <option value="not_available">Not Available</option>
      </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Vehicle Registration Number</span>
          </label>
          <input type="text" defaultValue={reg_number} name="reg_number" placeholder="Vehicle Registration Number" className="input input-bordered" required />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block font-medium">Features</label>
          <textarea
            id="features"
            defaultValue={features}
            name="features"
            className="w-full p-3 border border-gray-300 rounded"
          
            rows="4" required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            className="w-full p-3 border border-gray-300 rounded"
      required
            rows="4"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="text" defaultValue={carimgages} name='imgages' placeholder="Image" className="input input-bordered" required />
        </div>
        <div  className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input defaultValue={location} type="text" name="location" placeholder="Location" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6   md:col-span-2">
          <button className="btn btn-primary bg-yellow-200 text-black font-semibold">Update Car</button>
        </div>
      </form>






    <div className="modal-action">
      <label  htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default EditBookingMo;