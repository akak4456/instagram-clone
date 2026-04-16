import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import Find from "./pages/Find";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateLayout from "./PrivateLayout";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 보호 + 공통 레이아웃 라우트 */}
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/find" element={<Find />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
