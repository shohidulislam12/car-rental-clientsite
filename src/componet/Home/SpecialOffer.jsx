import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';



const SpecialOffer = () => {
     const [cars,setcars]=useState([])
  useEffect(()=>{
    const fetchallcars= async ()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cars`)
      const sortedCars = data.sort((a, b) => b.discount
       - a.discount)

      const recentCars = sortedCars.slice(0, 6);
      setcars(recentCars)
      }
    fetchallcars()
  },[])

//console.log("cars from offer",cars)




  return (
    <div className="my-10 px-5">
      <h2 className="text-3xl font-bold mb-8 text-center">Special Offers</h2>
      <div className="grid  grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {cars.map((car, index) => (
          <NavLink to='/available'
            key={index}
            className="bg-gradient-to-r my-element bg-[#F7F9FC] text-black to-indigo-600  h-72 md:h-64  flex flex-col flex-grow p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl animate__animated animate__slideInLeft"
          >
            <h3 className="text-2xl font-semibold mb-4">Get {car.discount
            }{ "% "} {car.modal}</h3>
            <p className="mb-6 flex-grow  text-sm">{car.description}</p>
            <a
              href={car?.buttonLink}
              className="flex items-center bg-[#0056D2] text-white p-2 rounded-md font-semibold hover:bg-yellow-600 transition"
            >
              {"books Now"} <AiOutlineArrowRight className="ml-2" />
            </a>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
