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
