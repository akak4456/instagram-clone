import {
  PreviewGrid,
  PreviewItemWrapper,
  PreviewItem,
  RemoveBtn,
  AddMoreBox,
} from "../../styles/features/upload.styles";

const UploadPreviewGrid = ({ files, maxFiles, onRemove, onAddMore }) => {
  return (
    <PreviewGrid>
      {files.map((item, index) => (
        <PreviewItemWrapper key={`${item.preview}-${index}`}>
          <PreviewItem src={item.preview} alt={`preview-${index}`} />
          <RemoveBtn type="button" onClick={() => onRemove(index)}>
            ✕
          </RemoveBtn>
        </PreviewItemWrapper>
      ))}

      {files.length < maxFiles && (
        <AddMoreBox type="button" onClick={onAddMore}>
          +
        </AddMoreBox>
      )}
    </PreviewGrid>
  );
};

export default UploadPreviewGrid;
