import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLogin, loading } = useAuth();
  if (loading) return null; // 또는 로딩 스피너

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
