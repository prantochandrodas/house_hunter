import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AllRoom from './AllRoom';
import FilterData from '../../FilterData/FilterData';
import Spinner from '../../Spinner/Spinner';

const AllRooms = ({ currentUser,setLoading }) => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
   
    
    const [allRooms, setDatas] = useState([])
   
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/allRooms?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(result => {
                setDatas(result)
                setLoading(false);
            })
    }, [page, size]);
    const newpages = Math.ceil(allRooms.count / size);

    return (
        <div>
            <FilterData
                allRooms={allRooms}
            ></FilterData>

            <div className='lg:grid block lg:grid-cols-2 lg:gap-2 p-4'>
                {
                    allRooms?.result?.map(allRoom => <AllRoom
                        currentUser={currentUser}
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

export default AllRooms;