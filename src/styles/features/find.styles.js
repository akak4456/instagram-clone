import styled from "styled-components";

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
