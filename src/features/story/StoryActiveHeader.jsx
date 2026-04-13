import {
  ActiveHeader,
  ActiveHeaderLeft,
  ActiveHeaderRight,
  HeaderIconButton,
  MoreMenu,
  MoreMenuItem,
  MoreMenuWrap,
  ProfileImage,
  Username,
  StoryTime,
} from "../../styles/features/story.styles";

const StoryActiveHeader = ({
  user,
  timeLabel,
  isPaused,
  isMoreOpen,
  onTogglePause,
  onToggleMore,
  onCloseMore,
}) => {
  return (
    <ActiveHeader>
      <ActiveHeaderLeft>
        <ProfileImage src={user.profileImage} alt={user.username} />
        <Username>{user.username}</Username>
        <StoryTime>{timeLabel}</StoryTime>
      </ActiveHeaderLeft>

      <ActiveHeaderRight>
        <HeaderIconButton
          type="button"
          onClick={onTogglePause}
          aria-label={isPaused ? "재생" : "일시정지"}
        >
          {isPaused ? "▶" : "❚❚"}
        </HeaderIconButton>

        <MoreMenuWrap>
          <HeaderIconButton
            type="button"
            onClick={onToggleMore}
            aria-label="더보기"
          >
            ⋯
          </HeaderIconButton>

          {isMoreOpen && (
            <MoreMenu>
              <MoreMenuItem type="button">신고</MoreMenuItem>
              <MoreMenuItem type="button">공유</MoreMenuItem>
              <MoreMenuItem type="button" onClick={onCloseMore}>
                취소
              </MoreMenuItem>
            </MoreMenu>
          )}
        </MoreMenuWrap>
      </ActiveHeaderRight>
    </ActiveHeader>
  );
};

export default StoryActiveHeader;
