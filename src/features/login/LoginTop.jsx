import arrowLeft from "../../assets/arrow-left.png";
import {
  LoginImgDiv,
  LoginImg,
  LoginToInsta,
  ErrorBox,
  ErrorIcon,
  ErrorText,
} from "../../styles/features/login.styles";
const LoginTop = ({ error }) => {
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
    </>
  );
};

export default LoginTop;
