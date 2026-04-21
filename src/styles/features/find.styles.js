import styled, { keyframes } from "styled-components";

export const FindGrid = styled.div`
  width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin-top: 32px;
`;

export const FindGridItem = styled.div`
  aspect-ratio: 9 / 16;
  background: #efefef;
  overflow: hidden;
  cursor: pointer;
`;

export const FindGridImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
`;

const shimmer = keyframes`
  0% {
    background-position: -240px 0;
  }
  100% {
    background-position: calc(240px + 100%) 0;
  }
`;

export const FindSkeletonItem = styled.div`
  aspect-ratio: 9 / 16;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(90deg, #f1f1f1 25%, #e7e7e7 37%, #f1f1f1 63%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;
