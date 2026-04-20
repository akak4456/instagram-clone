import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginTop from "../features/login/LoginTop";
import LoginForm from "../features/login/LoginForm";
import LoginBottom from "../features/login/LoginBottom";
import { usePost } from "../hooks/usePost";
import { useFollow } from "../hooks/useFollow";

const Login = () => {
  const [error, setError] = useState("");
  const { resetPosts } = usePost();
  const { login } = useAuth();
  const { resetFollowingUsers } = useFollow();
  const navigate = useNavigate();

  useEffect(() => {
    resetPosts();
    resetFollowingUsers();
  }, []);

  const handleLogin = async (form) => {
    const res = await login(form);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      <LoginTop error={error} />
      <LoginForm handleLogin={handleLogin} />
      <LoginBottom />
    </>
  );
};

export default Login;
