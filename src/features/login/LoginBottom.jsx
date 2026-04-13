import Button from "../../components/Button";
import { LoginBottomDiv } from "../../styles/features/login.styles";
import { useNavigate } from "react-router-dom";
const LoginBottom = () => {
  const navigate = useNavigate();
  return (
    <>
      <LoginBottomDiv>
        <Button variant="transparent">비밀번호를 잊으셨나요?</Button>
        <Button variant="secondary" onClick={() => navigate("/signup")}>
          새 계정 만들기
        </Button>
      </LoginBottomDiv>
    </>
  );
};

export default LoginBottom;
