import { PostProvider } from "./PostContext";
import { AuthProvider } from "./AuthContext";
import { FollowProvider } from "./FollowContext";
import { UserProvider } from "./UserContext";
import { ReplyProvider } from "./ReplyContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <FollowProvider>
        <UserProvider>
          <PostProvider>
            <ReplyProvider>{children}</ReplyProvider>
          </PostProvider>
        </UserProvider>
      </FollowProvider>
    </AuthProvider>
  );
};
