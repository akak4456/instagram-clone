import uploadImages from "../../assets/upload-images.png";
import {
  DropZone,
  Icon,
  Text,
  SelectButton,
} from "../../styles/features/upload.styles";

const UploadEmptyState = ({ onSelectClick }) => {
  return (
    <DropZone onClick={onSelectClick}>
      <Icon>
        <img src={uploadImages} alt="upload-images" />
      </Icon>
      <Text>사진을 여기에 끌어다 놓으세요</Text>
      <SelectButton type="button">컴퓨터에서 선택</SelectButton>
    </DropZone>
  );
};

export default UploadEmptyState;
