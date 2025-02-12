import { FaCar } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { MdLightMode,MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const {user,setUser,theme,settheme}=useContext(AuthContext)
   const [userData,setUserdata]=useState([])
  const navigate=useNavigate()
  //add darkmood 
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );



  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      settheme('dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      settheme('light')
    }
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      fetchMycars();
    }
  }, [user]);
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  };
  
  // Apply saved theme on page load
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
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
        <div className={`navbar ${theme==='dark'?'bg-black text-white':'text-black bg-base-200' } top-0 fixed z-50 container mx-auto left-0 right-0   `}>
        <div className="flex-1 gap-2">
          <img className="h-10 w-10 rounded-sm" src="https://i.postimg.cc/hj7RWKwt/logo.jpg" alt="" />
          <Link to='/' className="text-2xl  font-semibold rancho">CarGoRent</Link>
        </div>
        <div>
          {
            user?<h2 className="text-2xl hidden md:flex rancho ">Welcome Mr,{userData?.name
            }</h2>:''
          }
           <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {darkMode ? <MdLightMode /> : <MdDarkMode />}
    </button>
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
              className="menu menu-sm dark:bg-black dark:text-white dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {
          list}
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Navbar;