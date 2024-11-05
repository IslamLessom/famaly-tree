import styled from "styled-components";
import { Button, Input } from "antd";

export const CreateFormContainerStyle = styled.div`
  //height: calc(100vh - 130px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const Container = styled.div`
  background: #ffffff;
  box-shadow: -1px 0px 1px 1px #00000042;
  width: 70%;
  height: 70vh;
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
export const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  padding: 10px;
  text-align: center;
`;
export const Hr = styled.hr``;
export const PersonContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  justify-items: center;
  width: 90%;
  height: 100%;
`;
export const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Image = styled.img`
  border-radius: 10px;
  height: 80%;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;
export const ContainerUploadFile = styled.div`
  margin-top: 20px;
`;
export const Label = styled.label``;
export const InputUploadFile = styled(Input)``;
export const UploadInfoContainer = styled.div`
  margin-top: 30px;
`;
export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 10px;
`;
export const TitleInput = styled.div`
  font-size: 17px;
  width: 50%;
`;
export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const UploadInfo = styled(Input)`
  width: 60%;
  cursor: pointer;
`;
export const ButtonSave = styled(Button)`
  margin-bottom: 5px;
  width: 40%;
  background-color: #0957d0;
  color: white;
  font-size: 18px;
`;
export const SelectInfo = styled.select`
  width: 50%;
  border: none;
  padding: 10px;
  cursor: pointer;
`;
