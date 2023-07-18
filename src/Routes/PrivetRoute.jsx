import { useQuery } from 'react-query';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({children}) => {
    const id = localStorage.getItem('loginId')
    if(id){
        return children;
    }else{
        return <Navigate to='/signin'></Navigate> 
    }
};

export default PrivetRoute;