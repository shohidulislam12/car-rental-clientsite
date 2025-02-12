import Marquee from "react-fast-marquee";
import CarsInf from "./CarsInf";
import { useEffect, useState } from "react";
import axios from "axios";


const RecentListing = () => {
  const [cars,setcars]=useState([])
  useEffect(()=>{
    const fetchallcars= async ()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cars`)
      const sortedCars = data.sort((a, b) => new Date(b.addDate) - new Date(a.addDate));
      const recentCars = sortedCars.slice(0, 9);
      setcars(recentCars)
      }
    fetchallcars()
  },[])
  if (cars.length === 0){
    return (
           <div className="flex justify-center items-center h-screen">
             <span className="loading loading-spinner loading-lg"></span>
           </div>
         );
   }
  //console.log("all are",cars)
    return (
     <div className="py-20 dark:bg-black dark:text-white">
        <div className="text-center items-center ">
            <h2 className="text-2xl p-5    font-bold items-center">See Our Resent Listing Cars</h2>
            <span className="flex  justify-center flex-col md:flex-row items-center text-center  gap-5">
                <li className=" ">Wide Variety</li>
<li className=" ">Modern Features</li>
<li className=" ">Affordable Rates</li>
<li className=" ">Easy Bookingsystem.</li>
            </span>
        </div>
           <div className="container  text-gray-800 flex items-center mx-auto py-8">
        <h2 className="text-3xl font-semibold dark:text-white  md:w-[20%] text-center mb-4">
          Recent Listings
        </h2>
        <Marquee>
        <p className="text-lg dark:text-white text-gray-600 text-center">
     
        Explore our Recent Listings to discover a variety of vehicles tailored to your needs. Whether you’re looking for a fuel-efficient economy car, a spacious SUV for a family road trip, or a luxury sedan for a special occasion, we have something for everyone. Each car in our recent collection is meticulously maintained and comes with modern features such as GPS navigation, air conditioning, and Bluetooth connectivity. With competitive pricing and flexible booking options, you can easily find the perfect ride to match your journey. Book your car today and enjoy a seamless rental experience!

        </p>
        </Marquee>
      </div>
        <div className="grid gap-10 md:grid-cols-3 p-2  my-10 grid-cols-1">
            {cars.map(car=><CarsInf key={car._id} car={car}></CarsInf>)}
         
        </div>
     </div>
    );
};

export default RecentListing;