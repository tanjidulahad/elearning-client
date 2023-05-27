import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthProtection = () => {
  const {isLoggedinUser} = useSelector((state)=>state.auth)

  
    if (!isLoggedinUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      
      return <Outlet />;
    }
  
    return <Navigate to="/" />;
    
};

export default AuthProtection;