import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import AddNewHouse from "../Pages/AddNewHouse/AddNewHouse";
import PrivetRoute from "./PrivetRoute";
import MyHouses from "../Pages/MyHouses/MyHouses";
import GetHouseInfo from "../Pages/GetHouseInfo/GetHouseInfo";
import BookRooms from "../Pages/BookRooms/BookRooms";
import AllBookings from "../Pages/AllBookings/AllBookings";
import ShowFilterData from "../Pages/ShowFilterData/ShowFilterData";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<PrivetRoute> <Main></Main></PrivetRoute>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path:'/addNewHose',
          element:<AddNewHouse></AddNewHouse>
        },
        {
          path:'/myHouses',
          element:<MyHouses></MyHouses>,
        },
        {
          path:'/getHouseInfoById/:id',
          element:<GetHouseInfo></GetHouseInfo>,
          loader:({params})=>fetch(`http://localhost:5000/getHouseInfoById/${params.id}`)
        },
        {
          path:'/bookRooms/:id',
          element:<BookRooms></BookRooms>,
          loader:({params})=>fetch(`http://localhost:5000/bookRooms/${params.id}`)
        },
        {
          path:'/allBookings',
          element:<AllBookings></AllBookings>
        },
        {
          path:'/filterData',
          element:<ShowFilterData></ShowFilterData>
        }
      ]
    },
    {
        path:'/signup',
        element:<SignUp></SignUp>
    },
    {
        path:'/signin',
        element:<SignIn></SignIn>
    }
  ]);