import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const fetchCarDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/review`
      ); 
      setCars(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  //console.log("review cars", cars);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cars.length) % cars.length
    );
  };

  return (
    <div className="py-10 dark:bg-black dark:text-white px-5 text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
      <div className="relative w-full transition-transform transform hover:scale-105 hover:shadow-2xl max-w-lg mx-auto">
        {/* Testimonial Card */}
        <div className="bg-white dark:bg-gray-100 shadow-lg p-6 rounded-lg transition-transform transform duration-500">
          {/* User Photo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src={cars[currentIndex]?.userPhoto}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
          </div>
          
          {/* Car Image */}
          <div className="mb-4">
            <img
              src={cars[currentIndex]?.carImage}
              alt="Car"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <h3 className="text-xl font-semibold">{cars[currentIndex]?.modal}</h3>

          {/* Rating */}
          <div className="flex justify-center gap-1 my-2">
            {[...Array(5)].map((_, i) =>
              i < parseInt(cars[currentIndex]?.rating) ? (
                <AiFillStar key={i} className="text-yellow-500" />
              ) : (
                <AiOutlineStar key={i} className="text-gray-400" />
              )
            )}
          </div>

          <p className="text-gray-600 italic">
            "{cars[currentIndex]?.description}"
          </p>

          <p className="text-gray-500 text-sm mt-2">
            <strong>User:</strong> {cars[currentIndex]?.userEmail}
          </p>
        </div>


        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={prevSlide}
        >
          ❮
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
