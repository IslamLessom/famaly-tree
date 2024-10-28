import { Button, Checkbox, Select } from "antd";
import styled from "styled-components";

export const CreateHusbantsBlock = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 15px;
`;
export const HusbandsConatainer = styled.div`
  background: #ffffff;
  border: 3px solid #d5d7da;
  width: 70%;
  height: auto;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  padding: 30px;
  align-items: center;
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
  margin-bottom: 5px;
  width: 50%;
  background-color: #7f56d9;
  color: white;
  font-size: 18px;
`;
export const TitleCreateHusbant = styled.div`
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 10px;
  text-align: center;
`;
