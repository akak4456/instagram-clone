import { useRef, useState } from "react";
import styled from "styled-components";
import emoji from "../../assets/emoji.png";
import { useReply } from "../../hooks/useReply";
import { useAuth } from "../../hooks/useAuth";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid #efefef;
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

const Input = styled.textarea`
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

const Submit = styled.button`
  margin-left: 8px;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 14px;

  color: ${({ disabled }) => (disabled ? "#b2dffc" : "#0095f6")};

  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const CommentInput = ({ postId }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { user } = useAuth();
  const { addComment } = useReply(postId);

  const handleInput = (e) => {
    setText(e.target.value);

    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    addComment(postId, user.userId, text);
    setText("");

    // 높이 초기화
    const el = textareaRef.current;
    el.style.height = "auto";
  };

  return (
    <Wrapper>
      <Emoji>
        <img src={emoji} alt="emoji" />
      </Emoji>

      <Input
        ref={textareaRef}
        value={text}
        onChange={handleInput}
        rows={1}
        placeholder="댓글 달기..."
      />

      <Submit disabled={!text.trim()} onClick={handleSubmit}>
        게시
      </Submit>
    </Wrapper>
  );
};

export default CommentInput;
