import styled from "styled-components";
import Navigation from "./Navigation";

const Container = styled.div`
  display: flex;
`;

const Main = styled.main`
  padding-top: 60px;
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
