import { Left } from "../../styles/features/upload.styles";
import UploadPreviewGrid from "./UploadPreviewGrid";
import UploadCaptionSection from "./UploadCaptionSection";

const UploadPreviewSection = ({
  files,
  maxFiles,
  user,
  caption,
  onRemoveFile,
  onAddMore,
  onChangeCaption,
}) => {
  return (
    <>
      <Left>
        <UploadPreviewGrid
          files={files}
          maxFiles={maxFiles}
          onRemove={onRemoveFile}
          onAddMore={onAddMore}
        />
      </Left>

      <UploadCaptionSection
        user={user}
        caption={caption}
        onChangeCaption={onChangeCaption}
      />
    </>
  );
};

export default UploadPreviewSection;
