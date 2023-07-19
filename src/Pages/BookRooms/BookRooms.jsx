import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookRooms = () => {
    const roomData = useLoaderData();
    const [loading, setLoading] = useState(false);
    const natigate = useNavigate();
    const id = localStorage.getItem('loginId')
    const { data: user = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/User?id=${id}`);
            const data = await res.json();
            return data;
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelData = (data) => {
        const bookingData = {
            roomid:roomData?._id,
            name: user?.name,
            email: user?.email,
            phone: data.phone,
            bathRoom: roomData.bathRoom,
            bedrooms: roomData.bedrooms,
            city: roomData.city,
            description: roomData.description,
            picture: roomData.picture,
            rent: roomData.rent,
            roomSize: roomData.roomSize,
        }

        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                natigate('/')
                if(result.acknowledged==true){
                    toast.success('Sucessfully Booked', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                if (result == false) {
                    toast.info('All Ready Booked', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })

    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handelData)}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:p-4">
                    {/* name */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="Name">Name</label>
                        <input defaultValue={user?.name} name="name" disabled id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>


                    {/* email */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="Name">Name</label>
                        <input name="name" defaultValue={user?.email} disabled id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>

                    {/* phone*/}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">Phone Number</label>
                        <input name="phone" {...register("phone", {
                            required: "Phone number is required", pattern: {
                                value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                message: "Number have to valid"
                            }
                        })} id="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                    </div>

                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </div>
    );
};

export default BookRooms;