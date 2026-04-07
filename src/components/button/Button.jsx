import styled from "styled-components";
const StyledButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 22px;
  border: none;
  background-color: ${({ disabled }) => (disabled ? "#b2dffc" : "#0095f6")};
  color: white;
  font-weight: bold;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
const Button = ({ children, onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
