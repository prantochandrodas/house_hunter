import { useQuery } from "react-query";
import AllRooms from "./AllRooms/AllRooms";

const Home = () => {
    const id = localStorage.getItem('loginId')
    const { data: user = [], isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/User?id=${id}`);
            const data = await res.json();
            return data;
        }
    });
   
 
    if (isLoading) {
        return <p>loading...</p>
    }
    return (
        <div>
           <AllRooms></AllRooms>
        </div>

    );
};

export default Home;