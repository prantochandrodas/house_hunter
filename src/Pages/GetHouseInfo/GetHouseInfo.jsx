import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner/Spinner';

const GetHouseInfo = () => {
    const [loading,setLoading]=useState(false);
    const [editError,setEditError]=useState('');
    
    const oldData=useLoaderData();
    const natigate=useNavigate();
    const imgHostKey = import.meta.env.VITE_imgbb_key;
    // console.log(data);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handelData=(data)=>{
        setLoading(true);
        const image = data.picture[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                const addData = {
                    bathRoom: data.bathRoom,
                    bedrooms:data.bedrooms,
                    city: data.city,
                    description: data.description,
                    name: data.name,
                    phone: data.phone,
                    picture: imageData.data.url,
                    rent: data.rent,
                    roomSize: data.roomSize,
                }
                fetch(`http://localhost:5000/updateRoomData/${oldData?._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(addData)
                })
                    .then(res => res.json())
                    .then(result=>{
                        console.log(result)
                        natigate('/myHouses')
                        setLoading(false);
                    })
                    .catch(error=>{
                        toast.error('There is an error', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                        setEditError(error.message)
                          setLoading(false) 
                    })
            })
    }

    if(loading){
        return <Spinner></Spinner>
    }
    return (
        <div>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add House For Rent</h2>
            <form onSubmit={handleSubmit(handelData)}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    {/* name */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="Name">Name</label>
                        <input defaultValue={oldData?.name} name="name" {...register("name", { required: "Name is required" })} id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>


                    {/* city */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="city">City</label>
                        <input defaultValue={oldData?.city} name="city" {...register("city", { required: "City is required" })} id="city" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.city && <p className='text-red-600'>{errors.city?.message}</p>}
                    </div>



                    {/* bedrooms */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="bedrooms">Bedrooms</label>
                        <input defaultValue={oldData?.bedrooms} name="bedrooms" {...register("bedrooms", { required: "Bedrooms is required" })} id="bedrooms" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.bedrooms && <p className='text-red-600'>{errors.bedrooms?.message}</p>}
                    </div>


                    {/* bathRoom */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="bathRoom">Bath Room</label>
                        <input defaultValue={oldData?.bathRoom} name="bathRoom" {...register("bathRoom", { required: "BathRoom is required" })} id="bathRoom" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.bedrooms && <p className='text-red-600'>{errors.bedrooms?.message}</p>}
                    </div>



                    {/* roomSize */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="roomSize">Room size</label>
                        <input defaultValue={oldData?.roomSize} name="roomSize" {...register("roomSize", { required: "RoomSize is required" })} id="roomSize" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.roomSize && <p className='text-red-600'>{errors.roomSize?.message}</p>}
                    </div>

                    {/* picture */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="picture">Picture</label>
                        <input  name="picture" {...register("picture", { required: "picture is required" })} id="picture" type="file" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.picture && <p className='text-red-600'>{errors.picture?.message}</p>}
                    </div>



                    {/* availability date */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="date">Availability date </label>
                        <input defaultValue={oldData?.date} name="date" {...register("date", { required: "date is required" })} id="date" type="date" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.date && <p className='text-red-600'>{errors.date?.message}</p>}
                    </div>



                    {/* rent per month,*/}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="rent">Rent per month </label>
                        <input defaultValue={oldData?.rent} name="rent" {...register("rent", { required: "rent is required" })} id="rent" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.rent && <p className='text-red-600'>{errors.rent?.message}</p>}
                    </div>


                    {/* phone*/}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">Phone Number</label>
                        <input name="phone" defaultValue={oldData?.phone} {...register("phone", {
                                required: "Phone number is required", pattern: {
                                    value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
                                    message: "Number have to valid"
                                }
                            })} id="phone" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                    </div>

                    {/* description */}
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Description</label>
                        <textarea defaultValue={oldData?.description}  {...register("description", { required: "description is required" })} name="description" id="description" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" cols="30" rows="10"></textarea>
                        {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
            </form>
        </section>

    </div>
    );
};

export default GetHouseInfo;