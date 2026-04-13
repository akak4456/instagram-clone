import { SpinnerWrapper, Bar } from "../styles/components/Spinner.styles";

const Spinner = () => {
  return (
    <SpinnerWrapper>
      {Array.from({ length: 12 }).map((_, i) => (
        <Bar key={i} index={i} />
      ))}
    </SpinnerWrapper>
  );
};

export default Spinner;
