import { FaCar } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const {user,setUser}=useContext(AuthContext)
   const [userData,setUserdata]=useState([])
  const navigate=useNavigate()

  useEffect(() => {
    if (user) {
      fetchMycars();
    }
  }, [user]);

  const fetchMycars = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
      setUserdata(data);
    } catch (error) {
      console.error("Error fetching user cars:", error);
      // Optional: You can show a notification or message to the user if there's an error
    }
  };

  const handleLogout=()=>{
    signOut(auth)
    .then(() => {
      //console.log('sign Out Succee')
      setUser(null)
      navigate('/')
    }).catch((error) => {
      //console.log('sign Out err',error)
    });
  }

  const list=<>
  <li><NavLink to='/'>Home</NavLink></li>
  <li><NavLink to='/available'>Available Cars</NavLink></li>

{ user&& <li><NavLink to='/mycars'>My Cars</NavLink></li>}
{ user&& <li><NavLink to='/mybookings'>My Bookings</NavLink></li>}
{ user&& <li><NavLink to='/managecar'>Manage Car</NavLink></li>}

{ user&& <li><NavLink to='/addcar'>Add Car</NavLink></li>}
{ !user&&  <li><NavLink to='/login'>Login</NavLink></li>}
{  !user&&   <li><NavLink to='/registar'>Registar</NavLink></li>}
 { user&& <li><button onClick={handleLogout}  >Logout</button></li>}
  </>
  
    return (
        <div className="navbar bg-base-300 ">
        <div className="flex-1 gap-2">
          <img className="h-10 w-10 rounded-sm" src="https://i.postimg.cc/hj7RWKwt/logo.jpg" alt="" />
          <Link to='/' className="text-2xl text-black font-semibold rancho">CarGoRent</Link>
        </div>
        <div>
          {
            user?<h2 className="text-2xl rancho text-gray-500">Welcome Mr,{userData?.name
            }</h2>:''
          }
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">


          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
               {
                user? <img
                alt="Tailwind CSS Navbar component"
                src={userData?.photo} />: <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
               }
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {
          list}
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Navbar;