import styled from "styled-components";
import Navigation from "./Navigation";

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  position: absolute;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 60px;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
