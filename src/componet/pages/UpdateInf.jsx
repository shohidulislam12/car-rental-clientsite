import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateInf = ({ carId, startDate,fetchMycars }) => {
  const [formData, setFormData] = useState({
    modal: "",
    dailyPrice: "",
    availibility: "",
    reg_number: "",
    discount: "",
    carimgages: "",

    location: "",
    description: "",
    addDate:startDate
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Fetch car data and update state
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/singlecars/${carId}`
        );
        setFormData({
          modal: data.modal || "",
          dailyPrice: data.dailyPrice || "",
          availibility: data.availibility || "",
          reg_number: data.reg_number || "",
          discount: "",
          carimgages: data.carimgages || "",
          
          location: data.location || "",
          description: data.description || "",
          addDate:startDate,
        });
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCarData();
  }, [carId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      dailyPrice: parseFloat(formData.dailyPrice),
     
      wonerName: user?.displayName,
      wonerEmail: user?.email,
      wonerPhoto: user?.photoURL,
    };

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/updatecars/${carId}`,
        updatedFormData
      );
      toast.success("Update success!");
      fetchMycars();
      document.getElementById("my_modal_6").checked = false;
    } catch (error) {
      console.error("Error updating car details:", error);
    }

    navigate("/mycars");
  };

  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal w-full" role="dialog">
        <div className="modal-box w-[50%] p-0">
          <form
            onSubmit={handleSubmit}
            className="card-body rounded-xl text-xl font-semibold border shadow-xl mx-auto p-4 items-center"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Car Model</span>
              </label>
              <input
                type="text"
                name="modal"
                value={formData.modal}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Daily Rental Price</span>
              </label>
              <input
                type="number"
                name="dailyPrice"
                value={formData.dailyPrice}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Availability</label>
              <select
                name="availibility"
                value={formData.availibility}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              >
                <option value="">Select Availability</option>
                <option value="available">Available</option>
                <option value="not_available">Not Available</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vehicle Registration Number</span>
              </label>
              <input
                type="text"
                name="reg_number"
                value={formData.reg_number}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
          
            <div className="mb-4">
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                rows="4"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="text"
                name="carimgages"
                value={formData.carimgages}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Discount</span>
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-yellow-200 text-black font-semibold">
                Update Car
              </button>
            </div>
          </form>

          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInf;
