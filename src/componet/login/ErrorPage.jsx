import { useNavigate } from "react-router-dom";
import lotianim1 from "../../Animation - 1735056413928.json"
import Lottie from "lottie-react";
const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate("/"); 
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* Error Message and Image */}
        <div className="text-center">
        <Lottie className="w-1/2  mx-auto p-0 h-[400px]" animationData={lotianim1} loop={true} />
          <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
          <p className="text-lg text-gray-600 mt-2">We couldn't find the page you were looking for.</p>
        </div>
  
        {/* Redirect Button */}
        <button
          onClick={handleRedirect}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Homepage
        </button>
      </div>
    );
  };
export default ErrorPage;