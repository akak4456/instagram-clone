import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLogin } = useAuth();

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
