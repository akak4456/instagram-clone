import styled from "styled-components";

export const LoginImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ccc;
`;

export const LoginToInsta = styled.div`
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
export const LoginImg = styled.img`
  width: 80px;
  height: 80px;
`;

export const LoginBottomDiv = styled.div`
  width: 500px;
  margin: auto;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ErrorBox = styled.div`
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

export const ErrorText = styled.span`
  font-size: 14px;
  color: #ed4956;
`;

export const ErrorIcon = styled.span`
  color: #ed4956;
  font-weight: bold;
`;
