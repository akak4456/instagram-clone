import { FindGrid, FindSkeletonItem } from "../../styles/features/find.styles";

const FindSkeletonGrid = ({ count = 10 }) => {
  return (
    <FindGrid>
      {Array.from({ length: count }).map((_, index) => (
        <FindSkeletonItem key={index} />
      ))}
    </FindGrid>
  );
};

export default FindSkeletonGrid;
