// PostImage.jsx
import { useState } from "react";
import styled from "styled-components";
import profileArrowLeft from "../../assets/profile-arrow-left.png";
import profileArrowRight from "../../assets/profile-arrow-right.png";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ replyModal }) => (replyModal ? "100%" : "auto")};
  overflow: hidden;
  border-radius: ${({ replyModal }) => (replyModal ? "0" : "8px")};
`;

const Slider = styled.div`
  display: flex;
  transform: translateX(${(p) => `-${p.index * 100}%`});
  transition: transform 0.3s ease;
  height: 100%; // 항상 부모 높이에 맞춤
`;

const Slide = styled.img`
  min-width: 100%;
  height: ${({ replyModal }) => (replyModal ? "100%" : "auto")};
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

  display: flex;
  align-items: center;
  justify-content: center;

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

const PostImage = ({ images, replyModal = false }) => {
  const total = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  const next = () =>
    setCurrentIndex((prev) => (prev === total - 1 ? prev : prev + 1));

  return (
    <ImageContainer replyModal={replyModal}>
      <Slider index={currentIndex}>
        {images.map((img, idx) => (
          <Slide replyModal={replyModal} key={idx} src={img} />
        ))}
      </Slider>

      {currentIndex > 0 && (
        <Arrow left onClick={prev}>
          <img src={profileArrowLeft} alt="left-arrow" />
        </Arrow>
      )}
      {currentIndex < total - 1 && (
        <Arrow onClick={next}>
          <img src={profileArrowRight} alt="right-arrow" />
        </Arrow>
      )}

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
