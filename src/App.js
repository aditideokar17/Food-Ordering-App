import React, { lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "../src/components/Header";
import Body from "../src/components/Body";
import RestaurantMenu from "../src/components/RestaurantMenu";
import Error from "../src/components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";



// Lazy Loading
const About = lazy(() => import("../src/components/About"));

// App Layout
const AppLayout = () => {

    return (
        <Provider store={appStore}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
        </Provider>

    );
}

// Creating App Router
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <Suspense fallback={<Shimmer />}><About /></Suspense>
            },
            {
                path: "/contact",
                element: <Body />
            },
            {
                path: "/menu",
                element: <Body />
            },
            {
                path: "/services",
                element: <Body />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />
            }
        ],
        errorElement: <Error />
    }
]);

//rendering 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={appRouter} />
);