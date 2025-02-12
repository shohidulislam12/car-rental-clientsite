import { children, createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext=createContext(null)
const AuthProvider = ({ children}) => {
const [user,setUser]=useState(null)
const [loader,setloader]=useState(true)

const provider = new GoogleAuthProvider();


const ceratUser=(email, password)=>{
  setloader(true)
 return  createUserWithEmailAndPassword(auth, email, password)
}
const signInWithEmail=(email, password)=>{
  setloader(true)
 return  signInWithEmailAndPassword(auth, email, password)
}
const googleLogin=()=>{
  setloader(true)
return  signInWithPopup(auth, provider)
}







useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
    setloader(true); // Start loading when checking the auth state

    if (currentuser?.email) {
      //console.log(currentuser);
      setUser(currentuser);

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentuser?.email },
          { withCredentials: true }
        );
        //console.log(data);
      } catch (error) {
        console.error("Error during JWT fetch:", error);
      }
    } else {
      setUser(null); // Ensure user is cleared when logged out
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/logout`,{}, { withCredentials: true });
        //console.log("data",data)
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }

    setloader(false); // Stop loading after auth check is complete
  });

  // Cleanup function to unsubscribe
  return () => unsubscribe();
}, []);

//jwt


  const signOut=()=>{
    signOut(auth)
    .then(() => {
      //console.log('sign Out Succee')
      setUser(null)
      navigate('/')
    }).catch((error) => {
      //console.log('sign Out err',error)
    });

  }  



const authInf={
user,loader,ceratUser,signInWithEmail,googleLogin,setUser,signOut
}
//console.log("user",user)

return (
  <AuthContext.Provider value={authInf} >
{
    children
}
  </AuthContext.Provider>
)
};

export default AuthProvider;