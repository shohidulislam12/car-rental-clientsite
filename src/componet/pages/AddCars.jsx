import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/AuthProvider';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCars = () => {
    const {user}=useContext(AuthContext)
    const [availability, setAvailability] = useState('');
    const [startDate, setStartDate] = useState(new Date())
    const navigate=useNavigate()
    //console.log(startDate)
const handleChange = (e) => {

    setAvailability(e.target.value);
  };
    const handleSubmit=async(e)=>{
     e.preventDefault()
     const form=e.target 
     const modal=form.model.value
     const dailyPrice=parseFloat(form.dailyPrice.value)
const availibility=availability
if(availability===''){
  return toast.error("Plese Select Available or Not")
}
  //   const availibility=''
  const addDate=startDate
     const reg_number=form.reg_number.value
     const carimgages=form.imgages.value
     const features=form.features.value
     const featuresArray = features.split(',').map(item => item.trim());
     const location=form.location.value
     const description=form.description.value
     const discount=form.discount.value

     const wonerName=user?.displayName
     const wonerEmail=user.email
     const wonerPhoto=user?.photoURL
     const bookingCount=0
     const formData={modal,dailyPrice,availibility,discount,featuresArray,description,reg_number,bookingCount,carimgages,location,addDate,wonerEmail,wonerName,wonerPhoto}
     //console.log(formData)

     try {
        // Make the API call to save the car details
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cars`, formData);
        //console.log(data); 
           toast.success("sucessFully added")
         navigate('/mycars')
      } catch (error) {
        console.error('Error uploading car details:', error);
      }
    };

    

    return (
        <div className='py-10 dark:bg-black dark:text-white  '>
            <h2 className='text-xl font-bold text-center p-4'>Provide Cars Information </h2>
             <form onSubmit={handleSubmit} className="card-body dark:bg-white dark:text-white grid rounded-xl text-xl font-semibold  lg:w-[80%] border shadow-xl mx-auto md:grid-cols-2 grid-cols-1  items-center">
        <div className="form-control   ">
                    
          <label className="label">
            <span className="label-text">Car Model</span>
          </label>
          <input type="text" name="model" placeholder="Car Model" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Daily Rental Price</span>
          </label>
          <input type="number" name="dailyPrice" placeholder="Daily Rental Price (in $)" className="input input-bordered" required />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" name="availibility" className="block font-medium">Availability</label>
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
          <input type="text" name="reg_number" placeholder="Vehicle Registration Number" className="input input-bordered" required />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block font-medium">Features</label>
          <textarea
            id="features"
            name="features"
            placeholder='write feature separet by comma'
            className="w-full p-3 border border-gray-300 rounded"
          required
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 border border-gray-300 rounded"
      required
            rows="4"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input type="text" name='imgages' placeholder="Image" className="input input-bordered" required />
        </div>
        <div  className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input type="text" name="location" placeholder="Location" className="input input-bordered" required />
        </div>
        <div  className="form-control">
          <label className="label">
            <span className="label-text">DisCount</span>
          </label>
          <input type="number" name="discount" placeholder="discount in Percentage %" className="input input-bordered" required />
        </div>

        <div className="form-control mt-6   md:col-span-2">
          <button className="btn btn-primary bg-yellow-200 text-black font-semibold">Add Car</button>
        </div>
      </form>
        </div>
    );
};

export default AddCars;