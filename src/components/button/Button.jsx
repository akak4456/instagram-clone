import { StyledButton, Spinner } from "../../styles/Button.styles";
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
