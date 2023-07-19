import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataProvider';
import AllRoom from '../Home/AllRooms/AllRoom';

const ShowFilterData = () => {
    const {city,bedrooms,bathRoom,roomSize,rent,setText,text}=useContext(DataContext);
    console.log(city);
    const [loading,setLoading]=useState(false);
    const [data,setDatas]=useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/filter?page=${page}&size=${size}&city=${city}&bedrooms=${bedrooms}&roomSize=${roomSize}&rent=${rent}&bathRoom=${bathRoom}`)
            .then(res => res.json())
            .then(result => {
                setDatas(result)
                setLoading(false);
            })
    }, [page, size,rent,bedrooms,city,roomSize,bathRoom,text]);
    const newpages = Math.ceil(data.count / size);
    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
             <div className='lg:grid block lg:grid-cols-2 lg:gap-2 p-4'>
                {
                    data?.result?.map(allRoom => <AllRoom
                        key={allRoom._id}
                        allRoom={allRoom}
                    ></AllRoom>)
                }
            </div>
            <div className='w-[90%] mx-auto my-4'>
                <p className='font-bold text-xl'>Current Selected Page : {page}</p>
                <div className='flex '>
                    {
                        newpages >= 0 ? [...Array(newpages).keys()]?.map(number => <div key={number} className="mx-1">
                            <button key={number} className={page === number ? 'inline h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white' : 'inline h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900'} onClick={() => setPage(number)}>{number}</button>
                        </div>) :
                            <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowFilterData;