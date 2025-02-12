import { useEffect, useState } from "react";
import WhyChoseUs from "./WhyChoseUs";
import { Link } from "react-router-dom";


const Bannar = () => {
const [activeSlide,setActiveSlide]=useState(1)
useEffect(()=>{
    const timer=setInterval(()=>{
setActiveSlide((prevslider)=>prevslider===5?1:prevslider+1)
    },3000)
    return () => clearInterval(timer)
},[])

    return (
        <div className="carousel w-full">
        <div
          className={`carousel-item relative w-full h-[500px] bg-cover bg-center ${
            activeSlide === 1 ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: "url('https://i.ibb.co.com/FLMyYBxb/pavel-golasowski-59-j-OIzu1-DE-unsplash.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Luxury All Cars Hire</h1>
            <p className="text-lg mb-6">
              We offer professional car rental & limousine services in our range
              of high-end vehicles.
            </p>
            <Link  to='/available' className="btn bg-base-100 text-black btn-outline ">View Available Cars</Link>
          </div>
        </div>

        <div
          className={`carousel-item relative w-full h-[500px] bg-cover bg-center ${
            activeSlide === 2 ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: "url('https://i.ibb.co.com/R4H4ssTj/bro-takes-photos-2-NId3w-Bl-G7k-unsplash.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Comfort & Style</h1>
            <p className="text-lg mb-6">
            Your next adventure is just a rental away. At CargoRent, we offer more than just cars—we offer the opportunity to make memories. 
            </p>
            <Link to='/available' className="btn bg-base-100 text-black btn-outline">Book Now</Link>
          </div>
        </div>
  
        {/* Slide 3 */}
        <div
          className={`carousel-item relative w-full h-[500px] bg-cover bg-center ${
            activeSlide === 3 ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: "url('https://i.postimg.cc/T24Gntxb/carcover.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Your Road to Freedom Begins Here</h1>
            <p className="text-lg mb-6">
            Traveling should be about exploration, not about stress. Our reliable car rental service ensures you can explore new places without worrying about your ride. With our easy booking process and well-maintained vehicles, you're ready for your next adventure.
            </p>
            <Link to='/available' className="btn bg-base-100 text-black btn-outline">Get Started</Link>
          </div>
        </div>
        <div
          className={`carousel-item relative w-full h-[500px] bg-cover bg-center ${
            activeSlide === 4 ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: "url('https://i.ibb.co.com/7xfwjNqv/wolf-schram-19t6-J2-RVq-QE-unsplash.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Explore More, Worry Less</h1>
            <p className="text-lg mb-6">
            Whether you're heading out for a weekend getaway or on a business trip, our cars are here to turn your journey into an unforgettable experience.
            </p>
            <Link to='/available' className="btn bg-base-100 text-black btn-outline">See All </Link>
          </div>
        </div>
        <div
          className={`carousel-item relative w-full h-[500px] bg-cover bg-center ${
            activeSlide === 5 ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: "url('https://i.ibb.co.com/C3LjCtYL/shayan-godarzi-8x6infd-KZJI-unsplash.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Drive Your Dreams, One Rental at a Time</h1>
            <p className="text-lg mb-6">
              Book your next ride with our affordable and luxurious cars.
            </p>
            <Link View Available Cars className="btn bg-base-100 text-black btn-outline">View Available Cars</Link>
          </div>
        </div>
  
      </div>
    );
};

export default Bannar;