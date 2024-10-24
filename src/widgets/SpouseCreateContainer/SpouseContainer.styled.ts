import { Button, Checkbox, Select } from "antd";
import styled from "styled-components";

export const CreateHusbantsBlock = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 15px;
  border-radius: 10px;
  width: 60%;
`;
export const HusbandsConatainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Для Chrome, Safari и Opera */
  }

  & {
    -ms-overflow-style: none; /* Для Internet Explorer и Edge */
    scrollbar-width: none; /* Для Firefox */
  }
  height: 300px;
  width: 100%;
`;

export const CheckboxHusband = styled(Checkbox)`
  margin-top: 10px;
  margin-left: 10px;
`;

export const SelectInfo = styled.select`
  width: 60%;
  border: none;
  padding: 10px;
  cursor: pointer;
`;
export const ButtonSave = styled(Button)`
  margin-top: 10px;
  text-align: center;
  background-color: #7f56d9;
  color: white;
`;
export const TitleCreateHusbant = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
