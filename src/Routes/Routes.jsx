import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import AddNewHouse from "../Pages/AddNewHouse/AddNewHouse";
import PrivetRoute from "./PrivetRoute";

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