import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/LoginForm";
import { useCallback } from "react";
import arrowLeft from "../assets/arrow-left.png";
import Button from "../components/button/Button";

const LoginImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ccc;
`;

const LoginToInsta = styled.div`
  width: 500px;
  margin: auto;
  margin-top: 120px;
  margin-bottom: 40px;
  display: flex;
  gap: 16px;
  justify-content: start;
  align-items: center;

  span {
    font-weight: 500;
  }
`;
const LoginImg = styled.img`
  width: 80px;
  height: 80px;
`;

const LoginBottomDiv = styled.div`
  width: 500px;
  margin: auto;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    const fakeUser = {
      id: 1,
      username: "test_user",
      profileImage: "/images/profile.jpg",
    };

    login(fakeUser);
    navigate("/");
  }, [login, navigate]);

  console.log("Login");

  return (
    <>
      <LoginImgDiv>
        <LoginImg src="https://static.cdninstagram.com/rsrc.php/yO/r/Ny6hrBVLYjl.webp" />
      </LoginImgDiv>
      <LoginToInsta>
        <img src={arrowLeft} alt="arrow-left" />
        <span>Instagram으로 로그인</span>
      </LoginToInsta>
      <LoginForm handleLogin={handleLogin} />
      <LoginBottomDiv>
        <Button variant="transparent">비밀번호를 잊으셨나요?</Button>
        <Button variant="secondary">새 계정 만들기</Button>
      </LoginBottomDiv>
    </>
  );
};

export default Login;
