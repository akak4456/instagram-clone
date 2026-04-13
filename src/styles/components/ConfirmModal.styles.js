import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // UploadModal보다 위
`;

export const ModalBox = styled.div`
  width: 360px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
`;

export const Title = styled.div`
  padding: 20px 16px 8px;
  font-weight: bold;
`;

export const Description = styled.div`
  padding-bottom: 16px;
  color: gray;
  font-size: 14px;
`;

export const Divider = styled.div`
  height: 1px;
  background: #eee;
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f8f8f8;
  }

  &.danger {
    color: red;
    font-weight: bold;
  }
`;
