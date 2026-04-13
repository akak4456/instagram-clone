import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 20px 12px 6px;
  border-radius: 8px;
  border: 1px solid ${({ error }) => (error ? "#ed4956" : "#dbdbdb")};
  background: #ffffff;
  font-size: 18px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#ed4956" : "#0064e0")};
  }
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 12px;
  top: ${({ isActive }) => (isActive ? "6px" : "50%")};
  transform: ${({ isActive }) =>
    isActive ? "translateY(0)" : "translateY(-50%)"};
  font-size: ${({ isActive }) => (isActive ? "11px" : "14px")};
  color: ${({ error }) => (error ? "#ed4956" : "#8e8e8e")};
  pointer-events: none;
  transition: all 0.2s ease;
`;
