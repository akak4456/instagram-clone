import { useState } from "react";
import postLikeFill from "../assets/post-like-fill.png";
import postLike from "../assets/post-like.png";
import { LikeIconImg } from "../styles/components/LikeIcon.styles";

const LikeIcon = ({ isLiked, onClick, width }) => {
  const [animateLike, setAnimateLike] = useState(false);

  const handleClick = (e) => {
    // 애니메이션 실행
    setAnimateLike(true);

    // 부모 컴포넌트의 클릭 이벤트 실행
    if (onClick) {
      onClick(e);
    }

    // 애니메이션 종료 (300ms 후)
    setTimeout(() => setAnimateLike(false), 300);
  };

  return (
    <LikeIconImg
      src={isLiked ? postLikeFill : postLike}
      alt="post-like"
      animate={animateLike}
      onClick={handleClick}
      $width={width}
    />
  );
};

export default LikeIcon;
