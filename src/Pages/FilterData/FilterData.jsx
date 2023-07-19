import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';

const FilterData = ({ allRooms}) => {
    const {setCity,setbedrooms,setBathRoom,setRoomSize,setRent}=useContext(DataContext);
    const navigate=useNavigate();
    const handelSumbit=(e)=>{
        e.preventDefault()
        const form=e.target;
        setCity(form.city.value)
        setbedrooms(form.bedrooms.value)
        setBathRoom(form.bathRoom.value)
        setRoomSize(form.roomSize.value)
        setRent(form.rent.value)
        navigate('/filterData')
    }
    return (
        <div>
            <form onSubmit={handelSumbit}>
                <div className='p-4 lg:flex grid grid-cols-2'>
                    <div className='pr-4'>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-900">
                            city
                        </label>
                        <select name="city" id="city" className="mt-1.5 lg:w-[130px] w-[120px] border rounded-md border-gray-300 text-gray-700 sm:text-sm">
                            <option value=''>Please select</option>
                            {
                                allRooms?.result?.map(data => <option key={data._id} value={data.city}>{data.city}</option>)
                            }

                        </select>
                    </div>
                    
                    <div className='pr-4'>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-900">
                            Bed rooms
                        </label>
                        <select name="bedrooms" id="bedrooms" className="mt-1.5 lg:w-[130px] border rounded-md border-gray-300 text-gray-700 sm:text-sm">
                            <option value=''>Please select </option>
                            {
                                allRooms?.result?.map(data => <option key={data._id} value={data.bedrooms}>{data.bedrooms}</option>)
                            }

                        </select>
                    </div>

                    <div className='pr-4'>
                        <label htmlFor="bathRoom" className="block text-sm font-medium text-gray-900">
                            Bath rooms
                        </label>
                        <select name="bathRoom" id="bathRoom" className="mt-1.5 lg:w-[130px] border rounded-md border-gray-300 text-gray-700 sm:text-sm">
                            <option value=''>Please select </option>
                            {
                                allRooms?.result?.map(data => <option key={data._id} value={data.bathRoom}>{data.bathRoom}</option>)
                            }

                        </select>
                    </div>

                    <div className='pr-4'>
                        <label htmlFor="roomSize" className="block text-sm font-medium text-gray-900">
                            Room Size
                        </label>
                        <select name="roomSize" id="roomSize" className="mt-1.5 lg:w-[130px] border rounded-md border-gray-300 text-gray-700 sm:text-sm">
                            <option value=''>Please select </option>
                            {
                                allRooms?.result?.map(data => <option key={data._id} value={data.roomSize}>{data.roomSize} Sq. Ft.</option>)
                            }

                        </select>
                    </div>

                    <div className='pr-4'>
                        <label htmlFor="rent" className="block text-sm font-medium text-gray-900">
                           Rent
                        </label>
                        <select name="rent" id="rent" className="mt-1.5 lg:w-[130px] border rounded-md border-gray-300 text-gray-700 sm:text-sm">
                            <option value=''>Please select </option>
                            {
                                allRooms?.result?.map(data => <option key={data._id} value={data.rent}>{data.rent} &#2547; </option>)
                            }

                        </select>
                    </div>
                    <button type="submit" className="px-8 mt-3 lg:mt-0 leading-none text-[12px] font-semibold border border-red-600 rounded hover:bg-red-500 hover:text-white">Filter</button>
                </div>
            </form>

        </div>

    );
};

export default FilterData;