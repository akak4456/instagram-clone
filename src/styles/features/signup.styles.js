import styled from "styled-components";

export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;

export const SignupFormLabel = styled.span`
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 18px;
`;

export const BirthWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
  margin-bottom: 4px;
  span {
    font-size: 13px;
    color: #ed4956;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

export const DescriptionDiv = styled.div`
  margin-top: 8px;
  b {
    color: #0064e0;
  }
`;

export const SignupPageWrapper = styled.div`
  width: 600px;
  margin: auto;
`;
export const SignupTopDiv = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;
export const SignupTopArrowBack = styled.img`
  padding: 10px 13px;
  border-radius: 100px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.05);
  }
`;
export const SignupTopMetaLogo = styled.img`
  margin-left: 10px;
`;

export const SignupTopTitle = styled.span`
  font-weight: bold;
  font-size: 25px;
  margin-left: 10px;
`;

export const SignupTopContent = styled.span`
  margin-left: 10px;
`;

export const SignupMiddleDiv = styled.div`
  margin-left: 10px;
`;
