import React from 'react';
import { useQuery } from 'react-query';
import AllRoom from './AllRoom';

const AllRooms = ({currentUser}) => {
    const { data: allRooms = [] } = useQuery({
        queryKey: ['allRooms'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allRooms`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div className='lg:grid block lg:grid-cols-2 lg:gap-2 p-4'>
           {
            allRooms?.map(allRoom=><AllRoom
                currentUser={currentUser}
                key={allRoom._id}
                allRoom={allRoom}
            ></AllRoom>)
           }
        </div>
    );
};

export default AllRooms;