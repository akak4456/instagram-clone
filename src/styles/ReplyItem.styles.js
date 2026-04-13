import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  gap: 10px;
`;

export const Left = styled.div`
  flex-shrink: 0;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center; /* 🔥 핵심: 프로필과 세로 중앙 정렬 */
  gap: 6px;
  line-height: 1.4;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const Caption = styled.span`
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Meta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 12px;
`;

export const Like = styled.span`
  cursor: pointer;
  font-weight: 500;
`;
