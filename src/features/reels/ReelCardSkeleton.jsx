import {
  ReelCard,
  ReelMediaArea,
  ReelSkeletonBottomOverlay,
  ReelUserRow,
  SkeletonBlock,
  SkeletonCircle,
  SkeletonUsername,
  SkeletonCaption,
} from "../../styles/features/reels.styles";

const ReelCardSkeleton = () => {
  return (
    <ReelCard>
      <ReelMediaArea>
        <SkeletonBlock $variant="media" />
      </ReelMediaArea>

      <ReelSkeletonBottomOverlay>
        <ReelUserRow>
          <SkeletonCircle />
          <SkeletonUsername />
        </ReelUserRow>

        <SkeletonCaption />
        <SkeletonCaption $short />
      </ReelSkeletonBottomOverlay>
    </ReelCard>
  );
};

export default ReelCardSkeleton;
