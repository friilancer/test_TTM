import { useUserAuthStateContext } from "../App";
import { useLocation, Navigate} from 'react-router-dom';
import { isEmail, isString } from "../helpers";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const userAuthState = useUserAuthStateContext();
    const location = useLocation();
  
    if (!isEmail(userAuthState.email) && !isString(userAuthState.token )) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }

export default ProtectedRoute