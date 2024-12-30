import Logo from "../../assets/logo.png";
import Cart from "../../assets/cart.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnlineStatus from "../utils/useOnlineStatus";


const Header = () => {
    // Local state variable
    const [logBtn, setLogBtn] = useState("Login");

    // custom hook
    const onlineStatus = useOnlineStatus();
    
    
    // useSelector Hook - subscribing to store using selector
    const cartItems = useSelector((store) => store.cart.items);
    
    return (
        <div className="flex justify-between items-center shadow-xl">
            
            {/* Logo Container */}
            <div className="ml-3">
                <img className="w-[90px]" src={Logo} alt="logo" />
            </div>

            <div className="nav-items">
                <ul className="flex gap-5 justify-center items-center">

                    
                    <li className="text-[13px] font-bold text-gray-500">Online Status : {onlineStatus?"✅":"🔴"}</li>
                    <Link className="hover:text-[#d62828] font-semibold text-gray-500 text-[17px]" to={"/"} ><li>Home</li></Link>
                    <Link className="hover:text-[#d62828] font-semibold text-gray-500 text-[17px]" to={"/menu"} ><li>Menu</li></Link>
                    <Link className="hover:text-[#d62828] font-semibold text-gray-500 text-[17px]" to={"/services"} ><li>Services</li></Link>
                    <Link className="hover:text-[#d62828] font-semibold text-gray-500 text-[17px]" to={"/about"} ><li>About</li></Link>
                    <Link className="hover:text-[#d62828] font-semibold text-gray-500 text-[17px]" to={"/contact"} ><li>Contact</li></Link>
                    
                    
                    
                </ul>
            </div>
            <div className="flex gap-4 px-2 py-1 items-center justify-center">

            <button className="px-2 py-1 rounded-lg text-white h-[43px] w-[100px] bg-[#dc2f02]" onClick={() => {
                        (logBtn == "Login") ? setLogBtn("Logout") : setLogBtn("Login")
                    }}>{logBtn}</button>

                <div>    
                <label className=" font-bold text-[20px] text-center  ">({cartItems.length})</label>
                
                <Link to={"/cart"}><img className="w-[45px] mb-5" src={Cart} alt="cart" /></Link>    
                    
                </div>
                
            </div>
        </div>
    )
}

export default Header;