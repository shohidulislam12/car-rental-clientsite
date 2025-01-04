import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './componet/Navbar/Navbar';
import MainPage from './componet/MainPage';
import Bannar from './componet/Home/Bannar';
import AvailableCars from './componet/pages/AvailableCars';
import MyCars from './componet/pages/MyCars';
import MyBookings from './componet/pages/MyBookings';
import Login from './componet/login/Login';
import Registar from './componet/login/Registar';
import AuthProvider from './Auth/AuthProvider';
import PrivateRaute from './componet/Privat/PrivateRaute';
import AddCars from './componet/pages/AddCars';
import ErrorPage from './componet/login/ErrorPage';
import WhyChoseUs from './componet/Home/WhyChoseUs';
import RecentListing from './componet/Home/RecentListing';
import Testimonial from './componet/Home/Testimonial';
import SpecialOffer from './componet/Home/SpecialOffer';
import CarDetails from './componet/pages/CarDetails';
import ManageCar from './componet/pages/ManageCar';
import ReviewCar from './componet/pages/ReviewCar';
import UpdateBook from './UpdateBook';
const router = createBrowserRouter([
  {
    path: "/",
    element:<MainPage></MainPage>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/',
        element:
        <>
        <Bannar></Bannar>
        <WhyChoseUs></WhyChoseUs>
        <RecentListing></RecentListing>
        <Testimonial></Testimonial>
        <SpecialOffer></SpecialOffer>
        </>
      },
 
      {
        path:'available',
        element:<AvailableCars></AvailableCars>
      },
      {
        path:'mycars',
        element:<PrivateRaute><MyCars></MyCars></PrivateRaute>
      },
      {
        path:'/cardetails/:id',
        element:<PrivateRaute><CarDetails></CarDetails></PrivateRaute>
      },
      {
        path:'/updateBook/:id',
        element:<PrivateRaute> <UpdateBook></UpdateBook></PrivateRaute>
      },
  
      {
        path:'addcar',
        element:<PrivateRaute><AddCars></AddCars> </PrivateRaute>
      },
      {
        path:'reviewcard/:id',
        element:<PrivateRaute><ReviewCar></ReviewCar> </PrivateRaute>
      },
      {
        path:'mybookings',
        element:<PrivateRaute> <MyBookings></MyBookings></PrivateRaute>
      },
      {
        path:'managecar',
        element:<PrivateRaute><ManageCar></ManageCar> </PrivateRaute>
      },
      {
        path:'Login',
        element:<Login></Login>
      },
      {
        path:'registar',
        element:<Registar></Registar>
      },
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
