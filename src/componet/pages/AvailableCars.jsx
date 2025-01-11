import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdGridOn, MdViewList, MdSort } from "react-icons/md";
import { format } from "date-fns";

const AvailableCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [avlcars, setAvlCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [search,setsearch]=useState('')

  useEffect(() => {
    const fetchMyCars = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/searchcars?search=${search}`
      );
      setCars(data);
    };
    fetchMyCars()
  }, [search]);


  useEffect(() => {
    // Filter available cars whenever `cars` changes
    const availableCars = cars.filter((car) => car.availibility === "available");
    setAvlCars(availableCars);
  }, [cars]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (type) => {
    const sortedCars = [...cars];
    if (type === "priceAsc") {
      sortedCars.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (type === "priceDesc") {
      sortedCars.sort((a, b) => b.dailyPrice - a.dailyPrice);
    } else if (type === "dateAsc") {
      sortedCars.sort((a, b) => new Date(a.addDate) - new Date(b.addDate));
    } else if (type === "dateDesc") {
      sortedCars.sort((a, b) => new Date(b.addDate) - new Date(a.addDate));
    }
    setCars(sortedCars);
    setSortBy(type);
  };


//console.log(search)
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        {/* Search Bar */}
        <input
          type="text"
          onChange={(e)=>setsearch(e.target.value)}
          placeholder="Search by model or location ..."
        //  value={searchTerm}
        //  onChange={handleSearch}
          className="input input-bordered w-1/3"
        />

        {/* Sort Dropdown */}
        <div className="dropdown dropdown-bottom">
  <div tabIndex={0} role="button btn btn-outline flex items-center gap-2" className="btn m-1">    <MdSort /> Sort</div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
  <li>
              <button onClick={() => handleSort("priceAsc")}>Price: Low to High</button>
            </li>
            <li>
              <button onClick={() => handleSort("priceDesc")}>Price: High to Low</button>
            </li>
            <li>
              <button onClick={() => handleSort("dateAsc")}>Date: Oldest First</button>
            </li>
            <li>
              <button onClick={() => handleSort("dateDesc")}>Date: Newest First</button>
            </li>
  </ul>
</div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("grid")}
            className={`btn hidden md:flex btn-square ${viewMode === "grid" && "btn-primary"}`}
          >
            <MdGridOn />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`btn btn-square ${viewMode === "list" && "btn-primary"}`}
          >
            <MdViewList />
          </button> 
        </div>
      </div>

      {/* Cars Display */}
       { viewMode==="grid"?
        <div className="md:grid  gap-5 grid-cols-2 md:grid-cols-3">
          {
           avlcars.map(car=>
              <NavLink to={`/cardetails/${car._id}`} 
              key={car._id}
              className="card  bg-base-100  shadow-md border border-gray-200"
            >
              <figure>
                <img
                  src={car.carimgages}
                  alt={car.modal}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{car.modal}</h2>
                <p>
                  <strong>Owner:</strong> {car.wonerEmail}
                </p>
                <p>
                  <strong>Location:</strong> {car.location}
                </p>
                <p>
                  <strong>Price:</strong> ${car.dailyPrice}/day
                </p>
                <p>
                  <strong>Added On:</strong>{" "}
                  {car.addDate && format(new Date(car.addDate), "P")}
                </p>
                <div className="card-actions justify-end">
                  <NavLink
                    to={`/cardetails/${car._id}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </NavLink>
                </div>
              </div>
            </NavLink>
            )
          }
        </div>:
        <div className="md:px-20 grid grid-cols-1 gap-5">
          {
            avlcars.map(car=>
              <NavLink to={`/cardetails/${car._id}`}
              key={car._id}
              className="card flex md:flex-row flex-col items-center  bg-base-100 shadow-md border gap-4 p-5  border-gray-200"
            >
              <div className="">
              <figure>
                <img
                  src={car.carimgages}
                  alt={car.modal}
                  className=" w-full p-0 object-cover"
                />
              </figure>
              </div>
              <div className="card-body p-5">
                <h2 className="card-title">{car.modal}</h2>
                <p>
                  <strong>Brand:</strong> {car.brand}
                </p>
                <p>
                  <strong>Location:</strong> {car.location}
                </p>
                <p>
                  <strong>Price:</strong> ${car.dailyPrice}/day
                </p>
                <p>
                  <strong>Added On:</strong>{" "}
                  {car.addDate && format(new Date(car.addDate), "P")}
                </p>
                <div className="card-actions ">
                  <Link
                    to={`/car-details/${car._id}`}
                    className="btn btn-primary"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </NavLink>
            )
          }
        </div>


       }
    </div>
  );
};

export default AvailableCars;
