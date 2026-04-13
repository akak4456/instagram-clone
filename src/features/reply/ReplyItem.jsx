import { getTimeDiff } from "../../utils/timeUtils";
import { useAuth } from "../../hooks/useAuth";
import { useReply } from "../../hooks/useReply";
import ProfileImage from "../../components/ProfileImage";
import LikeIcon from "../../components/LikeIcon";
import {
  Wrapper,
  Left,
  Center,
  TopRow,
  Username,
  Caption,
  Meta,
  Like,
  Right,
} from "../../styles/features/reply.styles";

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
