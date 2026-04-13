import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #efefef;
`;

export const Emoji = styled.div`
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

export const Input = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  resize: none;

  font-size: 14px;
  line-height: 20px;

  max-height: 80px; /* 🔥 4줄 제한 */
  overflow-y: auto;

  background: transparent;

  &::placeholder {
    color: #999;
  }
`;

export const Submit = styled.button`
  margin-left: 8px;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 14px;

  color: ${({ disabled }) => (disabled ? "#b2dffc" : "#0095f6")};

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
