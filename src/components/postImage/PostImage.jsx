import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const Slider = styled.div`
  display: flex;
  transform: translateX(${(p) => `-${p.index * 100}%`});
  transition: transform 0.3s ease;
`;

const Slide = styled.img`
  min-width: 100%;
  height: auto;
  object-fit: cover;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => (left ? "left: 10px;" : "right: 10px;")}

  width: 32px;
  height: 32px;

  background: white;
  border: none;
  border-radius: 50%;

  display: flex; /* 🔥 추가 */
  align-items: center; /* 🔥 세로 중앙 */
  justify-content: center; /* 🔥 가로 중앙 */

  z-index: 10;

  cursor: pointer;
  opacity: 0.7;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "white" : "#ccc")};
`;
const PostImage = ({ images }) => {
  const total = images.length;

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? prev : prev + 1));
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <ImageContainer>
      <Slider index={currentIndex}>
        {images.map((img, idx) => (
          <Slide key={idx} src={img} />
        ))}
      </Slider>

      {/* 좌우 버튼 */}
      {currentIndex > 0 && (
        <Arrow left onClick={prev}>
          <img src={profileArrowLeft} alt="profile-arrow-left" />
        </Arrow>
      )}
      {currentIndex < total - 1 && (
        <Arrow onClick={next}>
          <img src={profileArrowRight} alt="profile-arrow-right" />
        </Arrow>
      )}

      {/* Dot */}
      {total > 1 && (
        <Dots>
          {images.map((_, idx) => (
            <Dot key={idx} active={idx === currentIndex} />
          ))}
        </Dots>
      )}
    </ImageContainer>
  );
};

export default PostImage;
