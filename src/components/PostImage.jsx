// PostImage.jsx
import { useState } from "react";
import {
  ImageContainer,
  Slider,
  Slide,
  Arrow,
  Dots,
  Dot,
} from "../styles/components/PostImage.styles";
import profileArrowLeft from "../assets/profile-arrow-left.png";
import profileArrowRight from "../assets/profile-arrow-right.png";

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
