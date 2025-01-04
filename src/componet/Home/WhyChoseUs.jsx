import { AiOutlineFileSearch } from "react-icons/ai";
import { FaDollarSign, FaHeadset } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import { MdDirectionsCar, MdDiscount } from "react-icons/md";
import 'animate.css';

const WhyChoseUs = () => {
    return (
<div>

<div className="flex flex-col md:flex-row font-bold my-20  animate__animated animate__bounce px-20">
        <h2 className="text-3xl flex-1  ">Why Choose Us?</h2>
        <p className="text-sm flex-1  text-gray-400">At CarGoRent, we aim to provide you with a seamless and reliable car rental experience. Whether you're planning a weekend getaway, a business trip, or a special occasion, our platform offers a wide range of vehicles and exceptional services tailored to meet your needs. Here’s why we stand out:</p>
    </div>

    <div className="py-6 grid gap-4 md:grid-cols-3 grid-cols-1">
    <div className="card bg-base-100 animate__animated animate__zoomIn   shadow-xl">
  <div className="card-body">
    <h2 className="card-title"> 
  

    <FaHeadset size={40} />
    Customer Support</h2>
    <p>
    Our dedicated customer service team is available 24/7 to assist you with any questions or concerns. Whether you need help with your booking or support during your rental, we're always here to help.</p>
 
  </div>
</div>
    <div className="card bg-base-100 animate__animated animate__zoomIn    shadow-xl">
  <div className="card-body">
    <h2 className="card-title">   <AiOutlineFileSearch size={40} />Easy Booking Process</h2>
    <p>
    Booking your ride is simple and quick. With just a few clicks, you can select your car, choose your rental period, and secure your reservation, all from the comfort of your home.</p>
 
  </div>
</div>
    <div className="card bg-base-100 animate__animated animate__zoomIn    shadow-xl">
  <div className="card-body">
    <h2 className="card-title">     <FaDollarSign size={40} />Affordable Prices</h2>
    <p>
    We offer competitive and transparent pricing, ensuring you get the best value for your money. No hidden fees – just honest, fair rates for every rental.</p>
  
  </div>
</div>
    <div className="card bg-base-100 animate__animated animate__zoomIn    shadow-xl">
  <div className="card-body">
    <h2 className="card-title">       <MdDirectionsCar size={40} ></MdDirectionsCar> Wide Variety of Cars</h2>
    <p>
    We offer a broad range of vehicles, from economical, budget-friendly cars to high-end luxury models. Whether you're looking for a compact car for city drives or a spacious SUV for a family vacation, our fleet has something to match your preferences and needs. Choose from well-maintained, modern vehicles to ensure comfort and reliability on every trip.</p>
  
  </div>
</div>
    <div className="card bg-base-100 animate__animated animate__zoomIn    shadow-xl">
  <div className="card-body">
    <h2 className="card-title"><FaCarOn size={40} /> Well-Maintained Vehicles</h2>
    <p>
    All our cars are regularly serviced and maintained to the highest standards, ensuring that you enjoy a safe and comfortable ride. Our vehicles are inspected before and after each rental to provide you with the peace of mind you deserve.</p>
   
  </div>
</div>
    <div className="card bg-base-100 animate__animated animate__zoomIn    shadow-xl">
  <div className="card-body">
    <h2 className="card-title"> <MdDiscount  size={40}/>Loyalty Program & Discounts</h2>
    <p>
    Join our loyalty program and enjoy exclusive discounts on future rentals, special offers, and rewards for every rental. We value our repeat customers and strive to provide ongoing benefits for your continued trust in our services.</p>
   
  </div>
</div>

    </div>
</div>
    );
};

export default WhyChoseUs;