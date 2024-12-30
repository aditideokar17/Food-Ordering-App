import {CDN_URL} from "../utils/constant";

// RestaurantCard Component
const RestaurantCard = (props) =>{
    const {resData} = props;
    const {cloudinaryImageId,name,avgRating,costForTwo,cuisines,sla} = resData.info;


    return(
        <div className="w-[245px] h-[280px] mx-3  my-2  hover:bg-gray-100 mb-5 ">
        <img className="w-full h-[150px] rounded-lg p-3 shadow-lg object-cover" src={CDN_URL + cloudinaryImageId} />
        <h3 className="ml-2 font-bold text-lg pt-3">{name}</h3>
        <p className="ml-2 font-bold text-[15px]">⭐ {avgRating}<span className="mx-3">{sla.slaString}</span></p>
        <h4 className="ml-2 mt-2 text-[15px] text-gray-500 font-semibold">{cuisines.join(", ")}</h4>
        </div>
    )
}

// Higher Order Component
// input => RestaurantCard => RestaurantCardIsOpen

export const withIsOpen = (RestaurantCard) =>{

    return (props) =>{
        return (
            <div>
                <label className="absolute mt-2 ml-5 px-2 rounded-sm bg-green-700  text-white font-semibold">Open</label>
                    <RestaurantCard {...props}/>
            </div>
        )
    }
}

export default RestaurantCard;