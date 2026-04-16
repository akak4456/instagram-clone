import { FeedProvider } from "./FeedContext";
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
          <FeedProvider>
            <ReplyProvider>
              <StoryProvider>{children}</StoryProvider>
            </ReplyProvider>
          </FeedProvider>
        </UserProvider>
      </FollowProvider>
    </AuthProvider>
  );
};
