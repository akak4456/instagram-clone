import styled from "styled-components";
import arrowLeft from "../assets/arrow-left.png";
import metaLogo from "../assets/meta-logo.png";
import SignupForm from "../features/auth/signup/SignupForm";

const SignupWrapper = styled.div`
  width: 600px;
  margin: auto;
`;
const SignupTopDiv = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;
const SignupTopArrowBack = styled.img`
  padding: 10px 13px;
  border-radius: 100px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.05);
  }
`;
const SignupTopMetaLogo = styled.img`
  margin-left: 10px;
`;

const SignupTopTitle = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-left: 10px;
`;

const SignupTopContent = styled.span`
  margin-left: 10px;
`;

const SignupMiddleDiv = styled.div`
  margin-left: 10px;
`;

const Signup = () => {
  return (
    <SignupWrapper>
      <SignupTopDiv>
        <SignupTopArrowBack src={arrowLeft} alt="arrow-left" />
        <SignupTopMetaLogo src={metaLogo} alt="meta-logo" />
        <SignupTopTitle>Instagram에서 시작하기</SignupTopTitle>
        <SignupTopContent>
          친구들의 사진과 동영상을 보려면 가입하세요.
        </SignupTopContent>
      </SignupTopDiv>
      <SignupMiddleDiv>
        <SignupForm />
      </SignupMiddleDiv>
    </SignupWrapper>
  );
};

export default Signup;
