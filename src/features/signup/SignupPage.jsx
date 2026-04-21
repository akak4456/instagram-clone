import arrowLeft from "../../assets/arrow-left.png";
import metaLogo from "../../assets/meta-logo.png";
import SignupForm from "./SignupForm";
import {
  SignupPageWrapper,
  SignupTopDiv,
  SignupTopArrowBack,
  SignupTopMetaLogo,
  SignupTopTitle,
  SignupTopContent,
  SignupMiddleDiv,
} from "../../styles/features/signup.styles";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <SignupPageWrapper>
      <SignupTopDiv>
        <SignupTopArrowBack
          src={arrowLeft}
          alt="arrow-left"
          onClick={() => navigate("/login")}
        />
        <SignupTopMetaLogo src={metaLogo} alt="meta-logo" />
        <SignupTopTitle>Instagram에서 시작하기</SignupTopTitle>
        <SignupTopContent>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </SignupTopContent>
      </SignupTopDiv>
      <SignupMiddleDiv>
        <SignupForm />
      </SignupMiddleDiv>
    </SignupPageWrapper>
  );
};

export default SignupPage;
