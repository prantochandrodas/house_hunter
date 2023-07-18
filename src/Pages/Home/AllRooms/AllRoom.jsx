import React from 'react';
import { useQuery } from 'react-query';

const AllRoom = ({ allRoom }) => {
    const id = localStorage.getItem('loginId')
    const { data: user = [], isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/User?id=${id}`);
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img alt="Home" src={allRoom?.picture} className="h-56 w-full rounded-md object-cover" />
                <div className="mt-2">
                    <dl>
                        <div>
                            <dt className="sr-only">Rent</dt>
                            <dd className="text-sm text-gray-500">&#2547; {allRoom?.rent}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Address</dt>
                            <dd className="font-medium">{allRoom?.city}</dd>
                        </div>
                    </dl>
                    <div className="mt-6 flex items-center gap-4 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg className="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">roomSize</p>
                                <p className="font-medium">{allRoom?.roomSize} Sq Ft</p>
                            </div>
                        </div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg className="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Bathroom</p>
                                <p className="font-medium">{allRoom?.bathRoom} rooms</p>
                            </div>
                        </div>
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                            <svg className="h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                            <div className="mt-1.5 sm:mt-0">
                                <p className="text-gray-500">Bedroom</p>
                                <p className="font-medium">{allRoom?.bedrooms ? allRoom.bedrooms : 0} rooms</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-[12px] py-2'>{allRoom?.description}</p>
                    {
                        user?.role == 'HouseRenter' ? <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                           Book Now
                            <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                                →
                            </span>
                        </a> : <></>
                    }


                </div>
            </a>
        </div>
    );
};

export default AllRoom;