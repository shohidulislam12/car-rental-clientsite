import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const UpdateBook = () => {
    const navigate=useNavigate()
const [endtDate, setEndtDate] = useState(new Date())
  const [bookingdate, BookingtDate] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date())
const submit=(e)=>{
    e.preventDefault()
    const update={
        startDate,endtDate
    }
//console.log(update)
}


    return (
        <div className="my-10">
 <form onSubmit={submit} className="card-body border w-1/2 border-2 bg-base-100 my-2 mx-auto">
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
                        <button className="btn btn-outline">Update</button>
      </form>
            
        </div>
    );
};

export default UpdateBook;