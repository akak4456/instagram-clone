import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 12px;
  gap: 10px;
`;

export const Left = styled.div`
  flex-shrink: 0;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center; /* 🔥 핵심: 프로필과 세로 중앙 정렬 */
  gap: 6px;
  line-height: 1.4;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

export const Caption = styled.span`
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Meta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 12px;
`;

export const Like = styled.span`
  cursor: pointer;
  font-weight: 500;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
export const ReplyModalXDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  img {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`;

export const ModalBox = styled.div`
  position: fixed;
  width: 60%;
  height: 95vh;
  background-color: white;
  display: flex;
`;

export const PostImageWrapper = styled.div`
  width: 55%;
`;
export const ReplyWrapper = styled.div`
  width: 45%;
  display: flex;
  min-height: 0;
  flex-direction: column;
  height: 100%;
`;

export const ReplyTopDiv = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
`;

export const ReplyTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Follow = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #515ff8;

  &:hover {
    cursor: pointer;
    color: #4251d6;
  }
`;

export const More = styled.div`
  cursor: pointer;
`;

export const ReplyMiddleDiv = styled.div`
  flex: 1; /* 🔥 남은 영역 전부 차지 */
  min-height: 0;
  overflow-y: auto; /* 🔥 댓글 많을 때 스크롤 */
  /* 🔥 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

export const ReplyModalPlusDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  img {
    cursor: pointer;
  }
`;

export const ReplyBottomDiv = styled.div``;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
`;

export const ActionLeft = styled.div`
  display: flex;
  gap: 20px;
`;

export const ActionItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 8px;
    font-weight: 500;
    font-size: 14px;
  }
`;

export const LikeCount = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding: 5px 10px;
`;

export const ReplyModalMeta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 12px;
  padding-left: 10px;
  padding-bottom: 8px;
`;
