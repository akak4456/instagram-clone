import styled from "styled-components";
const StyledButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 22px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ variant, disabled }) => {
    if (variant === "primary") {
      return disabled ? "#b2dffc" : "#0064e0";
    }
    if (variant === "secondary") {
      return "transparent";
    }
    if (variant === "secondary-default") {
      return "transparent";
    }
    if (variant === "transparent") {
      return "transparent";
    }
  }};

  border: ${({ variant }) => {
    if (variant === "secondary") {
      return "1px solid #0064e0";
    }
    if (variant === "secondary-default") {
      return "1px solid #ccc";
    }
    return "none";
  }};

  color: ${({ variant }) => {
    if (variant === "secondary") return "#0064e0";
    if (variant === "secondary-default") return "#000";
    if (variant === "transparent") return "#000";
    return "white";
  }};
  font-weight: bold;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: 0.2s;
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Button = ({
  children,
  onClick,
  disabled,
  loading,
  variant = "primary",
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
    >
      {loading ? <Spinner /> : children}
    </StyledButton>
  );
};

export default Button;
