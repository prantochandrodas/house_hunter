import { useQuery } from "react-query";

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
            <p>This is home</p>
        </div>
    );
};

export default Home;