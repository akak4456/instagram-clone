import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  width: ${({ $hasFiles }) => ($hasFiles ? "55%" : "40%")};
  height: 80vh;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
`;

export const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  position: relative;
`;

export const ShareBtn = styled.button`
  position: absolute;
  right: 24px;
  color: #3752e5;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const Icon = styled.div`
  img {
    width: 80px;
  }
`;

export const Text = styled.div`
  font-size: 20px;
`;

export const SelectButton = styled.button`
  background-color: #4a5cff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
`;

export const Left = styled.div`
  flex: 7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Right = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #eee;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding: 16px;
`;

export const PreviewItemWrapper = styled.div`
  position: relative;
`;

export const PreviewItem = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
`;

export const RemoveBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
`;

export const AddMoreBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  height: 120px;
  cursor: pointer;
  background: white;
  font-size: 28px;
`;

export const RightTitle = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const Caption = styled.textarea`
  margin: 0 16px;
  padding: 12px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  height: 120px;
  overflow-y: auto;
`;
