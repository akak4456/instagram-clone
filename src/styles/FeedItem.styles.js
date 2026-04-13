import styled from "styled-components";

export const Wrapper = styled.div`
  width: 470px;
  border-radius: 8px;
  background: white;
  margin: 20px auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Username = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

export const Time = styled.div`
  color: #858b92;
  font-size: 14px;
`;

export const More = styled.div`
  cursor: pointer;
`;

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

export const Caption = styled.div`
  padding: 4px 12px;
  font-size: 14px;
`;
