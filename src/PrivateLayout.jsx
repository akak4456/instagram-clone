import { Outlet } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";

const PrivateLayout = () => {
  return (
    <PrivateRoute>
      <Layout>
        <Outlet />
      </Layout>
    </PrivateRoute>
  );
};

export default PrivateLayout;
