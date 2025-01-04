import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const specialOffers = [
  {
    title: "15% Off Weekend Rentals",
    description: "Get 15% off for weekend rentals. Don't miss this limited-time offer!",
    buttonText: "Learn More",
    buttonLink: "/offers/weekend",
  },
  {
    title: "Luxury Cars at $99/Day",
    description: "Book a luxury car this holiday season for only $99/day. Hurry, offer ends soon!",
    buttonText: "Book Now",
    buttonLink: "/offers/luxury-cars",
  },
  {
    title: "Luxury Cars at $99/Day",
    description: "Book a luxury car this holiday season for only $99/day. Hurry, offer ends soon!",
    buttonText: "Book Now",
    buttonLink: "/offers/luxury-cars",
  },
  {
    title: "Luxury Cars at $99/Day",
    description: "Book a luxury car this holiday season for only $99/day. Hurry, offer ends soon!",
    buttonText: "Book Now",
    buttonLink: "/offers/luxury-cars",
  },
];

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
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <NavLink to='/available'
            key={index}
            className="bg-gradient-to-r my-element from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl animate__animated animate__slideInLeft"
          >
            <h3 className="text-2xl font-semibold mb-4">Get {car.discount
            }{ "% "} {car.modal}</h3>
            <p className="mb-6">{car.description}</p>
            <a
              href={car?.buttonLink}
              className="flex items-center bg-yellow-500 text-black p-2 rounded-md font-semibold hover:bg-yellow-600 transition"
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
