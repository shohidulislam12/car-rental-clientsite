import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";


const PrivateRaute = ({children}) => {
const location=useLocation()

    const {user,loader}=useContext(AuthContext)
if(loader){
 return (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
}
if(user){
    return children
}
return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRaute;