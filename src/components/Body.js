import { useEffect, useState } from "react";
import RestaurantCard,{withIsOpen} from "../components/RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import CARD_API from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";


// Body Component
const Body = () => {


    // Local State Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchInput, setSearchInput] = useState("");

     
    // Higher Order Compoennt
    const RestaurantIsOpen = withIsOpen(RestaurantCard)

    // UseEffect Hook
    useEffect(() => {
        fetchData();
    }, []);

    // Fetching Data - by making api call
    const fetchData = async () => {
        const data = await fetch(CARD_API,{
            headers: {
                'x-cors-api-key': 'temp_eb23ae4d7d7f8a393886ebf3a9d1e589'
                }
        });

        const json = await data.json();

        // optional chaining
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

  // Checking Online Status
  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return <h1 className="m-5 p-5 font-bold text-red-500">Looks like you're offline!! Check your intenrent connection.</h1>

    // JSX
    return (listOfRestaurants.length === 0) ? <Shimmer /> : (
        <div className="mx-3 my-2">

            {/* SearchBar */}
            <div className="mt-5 flex justify-center items-center">
                <input className="bg-white text-gray-700 outline-none font-semibold w-[500px] p-3 border border-gray-400 rounded-l-lg border-r-0 " type="text" placeholder="Search restaurant.." value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }}></input>

                <button className="bg-white hover:bg-gray-100 p-2 w-18 h-[50px] text-gray-700 font-semibold border border-gray-400   rounded-r-lg" onClick={() => {
                    const searchRes = listOfRestaurants.filter((res) =>
                        res.info.name.toLowerCase().includes(searchInput.toLowerCase()))
                    setFilteredRestaurant(searchRes);
                }}>Search</button>
            </div>

            {/* Filters */}
            <div className="flex gap-5 my-5 ml-5">
                {/* All Restaurants */}
                <div className="p-2 rounded-md text-white bg-[#dc2f02]">
                    <button className="filter-btn" onClick={() => {
                        setFilteredRestaurant(listOfRestaurants)
                        setSearchInput("");
                    }}>All</button>

                </div>

                {/* Top Rated Restaurant */}
                <div className="p-2 rounded-md text-white bg-[#dc2f02]">
                    <button className="filter-btn" onClick={() => {
                        const filteredByRatingRestaurant = listOfRestaurants.filter((res) => res.info.avgRating > 4.3)
                        setFilteredRestaurant(filteredByRatingRestaurant);
                        setSearchInput("");
                    }}>Top Rated Restaurants</button>
                </div>

                {/* Delivery Time */}
                <div className="p-2 rounded-md text-white bg-[#dc2f02]">
                    <button className="filter-btn" onClick={() => {
                        const filteredByDeliveryTime = listOfRestaurants.filter((res) => res.info.sla.deliveryTime < 60)
                        setFilteredRestaurant(filteredByDeliveryTime);
                        setSearchInput("");
                    }}>Delivery Time</button>
                </div>
            </div>

            

            <div className="flex flex-wrap justify-center items-center mb-5">
                {
                    filteredRestaurant.map((res) =>
                        <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
                            {
                            res.info.isOpen? (<RestaurantIsOpen resData={res} /> ): (<RestaurantCard  resData={res} />)
                            }
                             </Link>)
                }
            </div>
        </div>
    )
}

export default Body;