import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  width: 400px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  padding: 24px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const SubText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

export const Divider = styled.div`
  height: 1px;
  background: #eee;
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #fafafa;
  }
`;
