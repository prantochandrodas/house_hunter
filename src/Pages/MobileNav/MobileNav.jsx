import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    const [state, setState] = useState(false);
    const id = localStorage.getItem('loginId')
    const { data: user = [], isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/User?id=${id}`);
            const data = await res.json();
            return data;
        }
    });
    const menu = <>
        <Link to='/' onClick={() => setState(!state)}> <li className='lg:ml-5 text-lg lg:mt-0 mt-4  font-[500]'>Home</li></Link>
        {
            user?.role == 'HouseOwner' ? <> <Link to={`/myHouses`} onClick={() => setState(!state)}> <li className='lg:ml-5 text-lg lg:mt-0 mt-4 font-[500]'>My Houses</li></Link>
                <Link to='/addNewHose' onClick={() => setState(!state)}> <li className='lg:ml-5 text-lg lg:mt-0 mt-4 font-[500]'>Add New house</li></Link></>
                : <></>
        }
        {
            user?.role == 'HouseRenter' ?
                <Link to='allBookings' onClick={() => setState(!state)}> <li className='lg:ml-5 text-lg lg:mt-0 mt-4 font-[500]'>All Bookings</li></Link>
                : <></>
        }

    </>
    return (
        <nav className={` ${state ? 'mobileNavSticky bg-[#ffffff] lg:bg-[#212121]' : 'NavSticky'} w-full   bg-[#ffffff] text-black-500 border-b-2 md:border-0 md:static`}>
            <div className="items-center lg:w-[95%] lg:mx-auto px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <a href="javascript:void(0)">
                        <img src="https://merakiui.com/images/logo.svg" width={30} alt="" />
                    </a>
                    <div className="md:hidden">
                        <button className=" outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {menu}
                    </ul>

                </div>
                <div className={`md:flex md:items-center md:justify-center ${state ? 'block' : 'hidden'}`}>
                    <div className='md:my-0 my-2 flex'>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default MobileNav;