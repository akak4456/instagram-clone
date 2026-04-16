import { useRef, useState } from "react";
import {
  Wrapper,
  Emoji,
  Input,
  Submit,
} from "../styles/components/CommentInput.styles";
import emoji from "../assets/emoji.png";
import { useReply } from "../hooks/useReply";
import { useAuth } from "../hooks/useAuth";
import { usePost } from "../hooks/usePost";

const CommentInput = ({ postId }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { user } = useAuth();
  const { addComment } = useReply(postId);
  const { increaseCommentCount } = usePost();

  const handleInput = (e) => {
    setText(e.target.value);

    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    addComment({ postId, user, content: text });
    increaseCommentCount(postId);
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
