import { PostProvider } from "./PostContext";
import { AuthProvider } from "./AuthContext";
import { FollowProvider } from "./FollowContext";
import { UserProvider } from "./UserContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <FollowProvider>
        <UserProvider>
          <PostProvider>{children}</PostProvider>
        </UserProvider>
      </FollowProvider>
    </AuthProvider>
  );
};
