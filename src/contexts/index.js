import { PostProvider } from "./PostContext";
import { AuthProvider } from "./AuthContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PostProvider>{children}</PostProvider>
    </AuthProvider>
  );
};
