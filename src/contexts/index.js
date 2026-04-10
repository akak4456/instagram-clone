import { PostProvider } from "./PostContext";
import { AuthProvider } from "./AuthContext";
import { FollowProvider } from "./FollowContext";
import { UserProvider } from "./UserContext";
import { ReplyProvider } from "./ReplyContext";
import { StoryProvider } from "./StoryContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <FollowProvider>
        <UserProvider>
          <PostProvider>
            <ReplyProvider>
              <StoryProvider>{children}</StoryProvider>
            </ReplyProvider>
          </PostProvider>
        </UserProvider>
      </FollowProvider>
    </AuthProvider>
  );
};
