import styled from "styled-components";
import { useState } from "react";
import { Wrapper, StyledInput, StyledLabel } from "../../styles/Input.styles";

const Input = ({ label, value, onChange, type = "text", error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper>
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        error={error}
      />
      <StyledLabel isActive={isFocused || value} error={error}>
        {label}
      </StyledLabel>
    </Wrapper>
  );
};

export default Input;
