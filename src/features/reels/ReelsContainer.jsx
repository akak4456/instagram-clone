import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { ReelsContainerDiv } from "../../styles/features/reels.styles";

const ReelsContainer = () => {
  const { posts } = usePost();
  const [currentIndex, setCurrentIndex] = useState(0);
  return <ReelsContainerDiv></ReelsContainerDiv>;
};

export default ReelsContainer;
