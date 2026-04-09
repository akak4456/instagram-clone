import styled from "styled-components";
import likeIcon from "../../assets/post-like.png";
import { getTimeDiff } from "../../utils/getTimeDiff";

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

const Ring = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    45deg,
    #feda75,
    #fa7e1e,
    #d62976,
    #962fbf,
    #4f5bd5
  );
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.div`
  width: calc(100% - 4px); /* 🔥 핵심 */
  height: calc(100% - 4px);
  border-radius: 50%;
  background: url(${(p) => p.src}) center/cover;
`;

const ReplyItem = ({ comment }) => {
  const { user, content, createdAt } = comment;

  return (
    <Wrapper>
      {/* 프로필 */}
      <Left>
        <Ring>
          <Inner>
            <Profile src={user.profileImage} />
          </Inner>
        </Ring>
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
        <img src={likeIcon} alt="like" width={14} />
      </Right>
    </Wrapper>
  );
};

export default ReplyItem;
