import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthProvider";
import { toast } from "react-toastify";


const Login = () => {
const {signInWithEmail,googleLogin}=useContext(AuthContext)
const navigate=useNavigate()
const location=useLocation()
//console.log(location)
const from=location.state?.from|| '/'

    const handleLogin=(e)=>{
        e.preventDefault()
   
        const email=e.target.email.value
        const password=e.target.password.value
       
        const user={email,password}
        signInWithEmail(email,password)
        .then((user) => {
         //console.log(user)
         navigate(from)
         toast.success("sucessFully Login")
        })
        .catch((error) => {
          //console.log(error)
         return toast.error(error.message)
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
         
         
          });
        
        }
    
    return (
        <div className="flex justify-center mx-auto items-center min-h-screen bg-green-100">
        <div className="bg-white flex md:flex-row flex-col  rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
          {/* Left Section */}
          <div className="md:w-1/2 w-full p-5 bg-gradient-to-b from-green-300 to-green-100 flex justify-center items-center">
            <img
              src="https://i.postimg.cc/fysBsgh1/caers.jpg"
              alt="Car"
              className="w-full h-full p-10 rounded-2xl"
            />
          </div>
          <div className="md:w-1/2 w-full p-5 p-8 relative">
            <button className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600">
              &times;
            </button>
 
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Login your Account
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Since this is your first trip, you’ll need to provide us with some
              information before you can check out.
            </p>
  
            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                className="input input-bordered w-full mb-4"
              />
              <input
                type="password"
                name='password'
                placeholder="Password"
                className="input input-bordered w-full mb-4"
              />
              <button className="btn btn-warning w-full mb-4">Login</button>
            </form>
          
            {/* Links */}
            <div className="flex justify-between text-sm text-green-500">
            <button onClick={handleGoogle} className="btn btn-outline btn-accent w-full mb-4">Or, Login With <FaGoogle /></button>
            </div>
  
            {/* Sign Up */}
            <p className="text-center text-sm mt-6">
              New member?{" "}
              <Link to="/registar" state={{ from: from }} className="text-green-500 font-semibold hover:underline">
                Registar
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;