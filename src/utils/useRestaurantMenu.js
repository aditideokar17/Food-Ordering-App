import { useEffect, useState } from "react";

import { MENU_API } from "../utils/constant";

const useRestaurantMenu = (resId) =>{

        // local state variable
        const [resInfo, setResInfo] = useState(null);

    
        // useEffect
        useEffect(() => {
            fetchMenu();
        }, []);
    
        // Fetching Menu
        const fetchMenu = async () => {
            const data = await fetch(MENU_API + resId,{
                headers: {
                    'x-cors-api-key': 'temp_eb23ae4d7d7f8a393886ebf3a9d1e589'
                    }
            });
    
            const json = await data.json();
            // console.log(json.data);
            
            setResInfo(json.data);
        };


    return resInfo;
}

export default useRestaurantMenu;