import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isLogin, authLoading } = useAuth();
  if (authLoading) return null; // 또는 로딩 스피너

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
