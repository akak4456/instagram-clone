import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeUser = {
      id: 1,
      username: "test_user",
      profileImage: "/images/profile.jpg",
    };

    login(fakeUser);

    navigate("/");
  };

  return <button onClick={handleLogin}>로그인</button>;
};

export default Login;
