import styled from "styled-components";

const Wrapper = styled.div`
  width: 470px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background: white;
  margin: 20px auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Profile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: url(${(p) => p.src}) center/cover;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const More = styled.div`
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 470px;
  background: url(${(p) => p.src}) center/cover;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
`;

const ActionLeft = styled.div`
  display: flex;
  gap: 12px;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

const Likes = styled.div`
  padding: 0 12px;
  font-weight: 600;
  font-size: 14px;
`;

const Caption = styled.div`
  padding: 4px 12px;
  font-size: 14px;
`;

const Comments = styled.div`
  padding: 4px 12px;
  font-size: 14px;
  color: #8e8e8e;
  cursor: pointer;
`;

const FeedItem = ({ post }) => {
  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <Left>
          <Profile src={post.profileImage} />
          <Username>{post.username}</Username>
        </Left>
        <More>•••</More>
      </Header>

      {/* Image */}
      <ImageWrapper src={post.image} />

      {/* Actions */}
      <Actions>
        <ActionLeft>
          <Icon>❤️</Icon>
          <Icon>💬</Icon>
          <Icon>📤</Icon>
        </ActionLeft>
        <Icon>🔖</Icon>
      </Actions>

      {/* Likes */}
      <Likes>좋아요 {post.likeCount}개</Likes>

      {/* Caption */}
      <Caption>
        <b>{post.username}</b> {post.caption}
      </Caption>

      {/* Comments Preview */}
      <Comments>댓글 {post.commentCount}개 모두 보기</Comments>
    </Wrapper>
  );
};

export default FeedItem;
