import Navigation from "./Navigation";
import { Container, Main } from "../styles/Layout.styles";

const Layout = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
