import styled from "styled-components";
import { Button } from "antd";

export const HusbandsConatainer = styled.div`
  background: #ffffff;
  width: 90%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;

  align-items: center;
  overflow: hidden;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Для Chrome, Safari и Opera */
  }

  & {
    -ms-overflow-style: none; /* Для Internet Explorer и Edge */
    scrollbar-width: none; /* Для Firefox */
  }
`;

export const ButtonSave = styled(Button)`
  margin-bottom: 5px;
  margin-top: 15px;
  width: 20%;
  background-color: #7f56d9;
  color: white;
  font-size: 16px;
`;
