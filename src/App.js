import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Story from "./pages/Story";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout이 필요한 페이지 */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <Profile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/story"
            element={
              <PrivateRoute>
                <Layout>
                  <Story />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Layout이 필요 없는 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
