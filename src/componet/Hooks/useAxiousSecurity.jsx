import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.init";
import { toast } from "react-toastify";

// Create Axios instance
export const axiousSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const handleLogout=()=>{
  signOut(auth)

}
const useAxiousSecure = () => {  
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    const interceptor = axiousSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
         
          handleLogout()
         .then(()=>{
          //console.log("signOut")
         })
         navigate("/login"); 
        return toast.error("UnAuthorised Acess")

        
        }
        return Promise.reject(error); 
      }
    );

    return () => {
      axiousSecure.interceptors.response.eject(interceptor);
    };
  //}, [signOut, navigate]);
  }, []);

  return axiousSecure;
};

export default useAxiousSecure;
