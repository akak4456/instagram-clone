import styled from "styled-components";
import { getTimeDiff } from "../../utils/timeUtils";
import { useAuth } from "../../hooks/useAuth";
import { useReply } from "../../hooks/useReply";
import ProfileImage from "../../components/profileImage/ProfileImage";
import LikeIcon from "../../components/likeIcon/LikeIcon";

const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  gap: 10px;
`;

const Left = styled.div`
  flex-shrink: 0;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center; /* 🔥 핵심: 프로필과 세로 중앙 정렬 */
  gap: 6px;
  line-height: 1.4;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const Caption = styled.span`
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Meta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 12px;
`;

const Like = styled.span`
  cursor: pointer;
  font-weight: 500;
`;

const ReplyItem = ({ postId, comment }) => {
  const { user: currentUser } = useAuth();
  const { toggleReplyLike } = useReply(postId);
  const { user, content, createdAt } = comment;
  const userId = currentUser.userId;

  const isLiked = comment.likes.some((l) => l.userId === userId);

  return (
    <Wrapper>
      {/* 프로필 */}
      <Left>
        <ProfileImage user={user} />
      </Left>

      {/* 본문 */}
      <Center>
        <TopRow>
          <Username>{user.username}</Username>
          <Caption>{content}</Caption>
        </TopRow>

        <Meta>
          <span>{getTimeDiff(createdAt)}</span>
          {comment.likes.length > 0 && (
            <Like>좋아요 {comment.likes.length}개</Like>
          )}
          <Like>답글 달기</Like>
        </Meta>
      </Center>

      {/* 좋아요 아이콘 */}
      <Right>
        <LikeIcon
          isLiked={isLiked}
          onClick={() => toggleReplyLike(postId, comment.id, userId)}
          width="14px"
        />
      </Right>
    </Wrapper>
  );
};

export default ReplyItem;
