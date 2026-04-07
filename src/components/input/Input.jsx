import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px 12px 6px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  background: #ffffff;
  font-size: 18px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0064e0;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  left: 12px;
  top: ${({ isActive }) => (isActive ? "6px" : "50%")};
  transform: ${({ isActive }) =>
    isActive ? "translateY(0)" : "translateY(-50%)"};
  font-size: ${({ isActive }) => (isActive ? "11px" : "14px")};
  color: #8e8e8e;
  pointer-events: none;
  transition: all 0.2s ease;
`;

const Input = ({ label, value, onChange, type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper>
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <StyledLabel isActive={isFocused || value}>{label}</StyledLabel>
    </Wrapper>
  );
};

export default Input;
