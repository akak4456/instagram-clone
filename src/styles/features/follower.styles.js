import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  width: 580px;
  max-width: 92vw;
  height: 400px;
  max-height: 85vh;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  position: relative;
  height: 54px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
`;

export const SearchSection = styled.div`
  padding: 12px 16px;
  flex-shrink: 0;
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  height: 30px;
  background: #efefef;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;

  &::placeholder {
    color: #8e8e8e;
  }
`;

export const FollowerList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

export const ItemContainer = styled.div`
  min-height: 72px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ProfileImageFallback = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #dbdbdb;
  flex-shrink: 0;
`;

export const UserTextSection = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

export const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
`;

export const FollowBadge = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #4a57ff;
  cursor: pointer;
`;

export const UserIdText = styled.span`
  font-size: 14px;
  color: #8e8e8e;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RemoveButton = styled.button`
  border: none;
  background: #efefef;
  color: #262626;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #e2e2e2;
  }
`;

export const EmptyText = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
  font-size: 14px;
`;

export const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ConfirmModalBox = styled.div`
  width: 580px;
  max-width: 92vw;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 28px;
`;

export const ConfirmProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 24px;
`;

export const ConfirmProfileImageFallback = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #dbdbdb;
  margin-bottom: 24px;
`;

export const ConfirmTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111;
  text-align: center;
`;

export const ConfirmDescription = styled.p`
  margin: 16px 24px 28px;
  font-size: 14px;
  color: #737373;
  text-align: center;
  line-height: 1.5;

  strong {
    color: #262626;
    font-weight: 500;
  }
`;

export const ConfirmActionButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-top: 1px solid #dbdbdb;
  background: white;
  color: #ed4956;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ConfirmCancelButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-top: 1px solid #dbdbdb;
  background: white;
  color: #262626;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FollowButton = styled.button`
  border: none;
  background: #4a57ff;
  color: white;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #3f4cf0;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
