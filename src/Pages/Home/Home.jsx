import { useQuery } from "react-query";
import AllRooms from "./AllRooms/AllRooms";
import Spinner from "../Spinner/Spinner";
import { useState } from "react";

const Home = () => {
    const [loading,setLoading]=useState(false);
    const id = localStorage.getItem('loginId')
    const { data: user = [], isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/User?id=${id}`);
            const data = await res.json();
            return data;
        }
    });
   
 
    if (isLoading && loading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
           <AllRooms setLoading={setLoading}></AllRooms>
        </div>

    );
};

export default Home;