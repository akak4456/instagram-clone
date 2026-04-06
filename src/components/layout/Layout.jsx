import styled from "styled-components";
import Navigation from "./Navigation";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
