import styled from "styled-components";

const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 60px;
  background: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Navigation = () => {
  return (
    <Wrapper>
      <div>홈</div>
      <div>검색</div>
      <div>업로드</div>
      <div>프로필</div>
    </Wrapper>
  );
};

export default Navigation;
