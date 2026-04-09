import styled from "styled-components";

const ReplyItemTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReplyItem = ({ comment }) => {
  console.log(comment);
  return (
    <>
      <ReplyItemTopWrapper>{comment.id}</ReplyItemTopWrapper>
    </>
  );
};

export default ReplyItem;
