import { createContext, useEffect, useState } from "react";

export const DataContext=createContext();
const DataProvider = ({children}) => {

    const [city, setCity] = useState('');
    const [bedrooms, setbedrooms] = useState('');
    const [bathRoom, setBathRoom] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [text, setText] = useState('');
    const [rent, setRent] = useState('');
  const dataInfo={setCity,setText,text,setRent,setbedrooms,setBathRoom,setRoomSize,city,bedrooms,bathRoom,roomSize,rent}
    return (
        <div>
            <DataContext.Provider value={dataInfo}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;