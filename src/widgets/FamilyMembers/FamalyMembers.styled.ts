import { Input } from "antd";
import styled from "styled-components";

export const FamilyMembersContainer = styled.div`
  height: calc(100vh - 90px);
  overflow: hidden;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Для Chrome, Safari и Opera */
  }

  & {
    -ms-overflow-style: none; /* Для Internet Explorer и Edge */
    scrollbar-width: none; /* Для Firefox */
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  padding-top: 70px;
  background-color: #f8fafd;
`;
export const SearchInput = styled(Input)`
  width: 98%;
  margin-bottom: 10px;
`;
export const FamilyMemberStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 90%;
  box-shadow: 1px 1px 1px 1px #00000042;
  cursor: pointer;
`;
export const ImageMember = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
export const MemberInfoBlock = styled.div``;
export const MemberName = styled.div`
  font: small-caps bold 20px/1 sans-serif;
`;
export const MemberDate = styled.div``;
