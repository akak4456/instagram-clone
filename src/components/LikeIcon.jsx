import { useState, useRef, useEffect } from "react";
import postLikeFill from "../assets/post-like-fill.png";
import postLike from "../assets/post-like.png";
import { LikeIconImg } from "../styles/components/LikeIcon.styles";

const LikeIcon = ({ isLiked, onClick, width }) => {
  const [animateLike, setAnimateLike] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      // 첫 렌더링일 때는 애니메이션 실행하지 않음
      firstRender.current = false;
      return;
    }
    setAnimateLike(true);
    const timer = setTimeout(() => setAnimateLike(false), 300);

    return () => clearTimeout(timer);
  }, [isLiked]);
  return (
    <LikeIconImg
      src={isLiked ? postLikeFill : postLike}
      alt="post-like"
      animate={animateLike}
      onClick={onClick}
      $width={width}
    />
  );
};

export default LikeIcon;
