import styled from "styled-components";

export const Ring = styled.div`
  width: ${({ type }) => (type === "big" ? "80px" : "32px")};
  height: ${({ type }) => (type === "big" ? "80px" : "32px")};
  border-radius: 50%;
  padding: ${({ type }) => (type === "big" ? "3px" : "2px")};
  background: linear-gradient(
    45deg,
    #feda75,
    #fa7e1e,
    #d62976,
    #962fbf,
    #4f5bd5
  );
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Profile = styled.div`
  width: ${({ type }) =>
    type === "big" ? "calc(100% - 6px)" : "calc(100% - 4px)"};
  height: ${({ type }) =>
    type === "big" ? "calc(100% - 6px)" : "calc(100% - 4px)"};
  border-radius: 50%;
  background: url(${(p) => p.src}) center/cover;
`;
