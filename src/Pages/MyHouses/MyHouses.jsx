import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import AllRoom from '../Home/AllRooms/AllRoom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

const MyHouses = () => {
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



    const { data: myHouses = [] ,refetch} = useQuery({
        queryKey: ['myHouses'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/myHouses?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });
    // delete a user
    const handelDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost:5000/deleteRoom?id=${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {

                    toast.error('Room Deleted', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    refetch();
                    setLoading(false)
                }

            })
    }
    if(loading){
        return <p>loading...</p>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                picture
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                rent
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Bath Room
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                BadRoom
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                roomSize
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Phone
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Actions
                            </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            myHouses?.map(allData => <tr key={allData._id} className="odd:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {allData.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"><img src={allData.picture} width={50} alt="" /></td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allData.rent}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allData.bathRoom}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allData.badbedrooms ? allData.bedrooms : 1}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allData.roomSize}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{allData.phone}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <button onClick={()=>handelDelete(allData._id)} type="button" className="px-6 py-2 font-semibold border border-red-600 rounded hover:bg-red-500 hover:text-white">Delete</button>
                                    <Link to={`/getHouseInfoById/${allData._id}`} type="button" className="px-6 py-2 font-semibold border border-[#12AD2B] mx-2 rounded hover:bg-[#12AD2B] hover:text-white">Edit</Link>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHouses;