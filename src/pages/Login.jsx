import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/login/LoginForm";
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
  margin-bottom: ${({ hasError }) => (hasError ? "0px" : "40px")};
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

const ErrorBox = styled.div`
  box-sizing: border-box;
  width: 500px;
  margin: 16px auto 16px auto;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #ed4956;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ErrorText = styled.span`
  font-size: 14px;
  color: #ed4956;
`;

const ErrorIcon = styled.span`
  color: #ed4956;
  font-weight: bold;
`;

const Login = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

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
      <LoginImgDiv>
        <LoginImg src="https://static.cdninstagram.com/rsrc.php/yO/r/Ny6hrBVLYjl.webp" />
      </LoginImgDiv>
      <LoginToInsta hasError={!!error}>
        <img src={arrowLeft} alt="arrow-left" />
        <span>Instagram으로 로그인</span>
      </LoginToInsta>
      {error && (
        <ErrorBox>
          <ErrorIcon>!</ErrorIcon>
          <ErrorText>{error} </ErrorText>
        </ErrorBox>
      )}
      <LoginForm handleLogin={handleLogin} />
      <LoginBottomDiv>
        <Button variant="transparent">비밀번호를 잊으셨나요?</Button>
        <Button variant="secondary" onClick={() => navigate("/signup")}>
          새 계정 만들기
        </Button>
      </LoginBottomDiv>
    </>
  );
};

export default Login;
