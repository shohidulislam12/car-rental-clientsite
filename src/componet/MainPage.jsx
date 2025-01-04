import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Home/Footer";
import { ToastContainer } from "react-toastify";

const MainPage = () => {
    return (
        <div className="container mx-auto ">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
            <Footer></Footer>
            
        </div>
    );
};

export default MainPage;