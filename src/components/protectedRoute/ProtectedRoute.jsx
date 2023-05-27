import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const {isLoggedinUser} = useSelector((state)=>state.auth)
  
    if (!isLoggedinUser) {

      return <Navigate to="/auth" />;
    }
  
    return <Outlet />;
};

export default ProtectedRoute;