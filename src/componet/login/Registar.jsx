import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
const Registar = () => {
  const  navigate=useNavigate()
const {ceratUser,googleLogin,user}=useContext(AuthContext)
const location=useLocation()
const from=location.state?.from|| '/'
    const handleRegistar=(e)=>{
    e.preventDefault()
    const name=e.target.name.value
    const email=e.target.email.value
    const password=e.target.password.value
    const photo=e.target.photo.value
 

  
    ceratUser(email,password)
    .then((result) => {
      const user={name,email,password,photo}


         fetch(`${import.meta.env.VITE_API_URL}/registarUser`,{
          method:'POST',
          body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json"
            }
                 })
                 .then(res=>res.json())
                 .then(data=>{
                 //console.log(data);
            
          
                 })
                
      
        toast.success('SuccessFully Rejistar')
        return  navigate(from)
        })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    return toast.error(errorMessage)
    });

    }

    const handleGoogle=()=>{
      googleLogin()
      .then((result) => {
       //console.log(result)

// save database 
const name=result?.user?.displayName
const email=result.user.email

const password='googleverify'
const photo=result.user?.photoURL


const user={name,email,password,photo}
fetch(`${import.meta.env.VITE_API_URL}/registarUser`,{
  method:'POST',
  body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json"
    }
         })
         .then(res=>res.json())
         .then(data=>{
         //console.log(data);
    
  
         })
        

toast.success('SuccessFully Rejistar')
return  navigate(from)



      }).catch((error) => {
      //console.log("error",error.message)
      toast.error("error",error.message)
      });
    
    }

    return (
        <div className="flex justify-center mx-auto  items-center min-h-screen dark:bg-gray-400 bg-green-100">
        <div className="bg-white flex md:flex-row flex-col rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
          {/* Left Section */}
          <div className="md:w-1/2 w-full p-5 dark:bg-gray-500  ">
            <img
              src="https://i.postimg.cc/zB1sc73P/car5.jpg"
              alt="Car"
              className="w-full h-full rounded-2xl"
            />
          </div>
          <div className="md:w-1/2 w-full dark:bg-black dark:text-white  p-8 relative">
            <button className=" dark:text-white absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600">
              &times;
            </button>
 
            <h2 className="text-2xl dark:text-white font-bold mb-4 text-gray-800">
             Registar your Account
            </h2>
            <p className="text-sm dark:text-white text-gray-600 mb-6">
            "Let’s get you ready for your first trip. A few quick details, and you’re good to go!"
            </p>
  
            {/* Login Form */}
            <form onSubmit={handleRegistar}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full mb-4"
              />
              <input
                type="email"
                 name="email"
                placeholder="Email Id"
                className="input input-bordered w-full mb-4"
              />
              <input
                type="password"
                 name="password"
                placeholder="Password"
                className="input input-bordered w-full mb-4"
              />
              <input
                type="text"
                 name="photo"
                placeholder="PhotoUrl"
                className="input input-bordered w-full mb-4"
              />
              <button className="btn btn-warning w-full mb-4">Registar</button>
            </form>
         <button onClick={handleGoogle} className="btn btn-outline btn-accent w-full mb-4">Or, Login With <FaGoogle /></button>
            <p className="text-center text-sm mt-6">
             If Already Registar?{" "}
              <Link to="/login" className="text-green-500 font-semibold hover:underline">
              Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Registar;