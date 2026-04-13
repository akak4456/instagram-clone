import styled from "styled-components";

export const Panel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 450px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #dbdbdb;
  box-sizing: border-box;
  z-index: 200;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 28px;
  flex-shrink: 0;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 28px;
  height: 28px;
  font-size: 32px;
  line-height: 1;
  color: #262626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.65;
  }
`;

export const Title = styled.h2`
  margin: 8px 0 28px;
  font-size: 28px;
  font-weight: 700;
  color: #000;
  flex-shrink: 0;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 28px;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 20px;
  background: #efefef;
  padding: 0 40px 0 14px;
  font-size: 14px;
  box-sizing: border-box;
  color: #262626;

  &::placeholder {
    color: #8e8e8e;
  }
`;

export const InputClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: #c7c7c7;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  flex-shrink: 0;
`;

export const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

export const ClearAllButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #3b49ff;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const ResultArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const EmptyBox = styled.div`
  height: 100%;
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
  font-size: 14px;
  font-weight: 600;
`;

export const SearchResultList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
`;

export const SearchItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

export const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

export const Username = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VerifiedBadge = styled.span`
  font-size: 14px;
  color: #0095f6;
  flex-shrink: 0;
`;

export const UserMeta = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0 4px 0 8px;
  width: 24px;
  height: 24px;
  font-size: 28px;
  line-height: 1;
  color: #737373;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    opacity: 0.65;
  }
`;
