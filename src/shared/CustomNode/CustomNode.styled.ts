import { Handle } from "@xyflow/react";
import styled from "styled-components";

export const NodeContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column-reverse;
`;

export const Node = styled.div`
  border-radius: 5px;
  background: #ffffff;
  color: black;
  border: 4px solid rgb(168 162 158);
  height: 160px;
  width: 300px;

  .react-flow__handle {
    background: ${(props) => props.theme.primary};
    width: 8px;
    height: 10px;
    border-radius: 3px;
  }
`;
export const FullContainer = styled.div``;

export const NodeImage = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 100%;
  border: 7px solid #6b728085;
`;

export const ContainerPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 9px;
  width: 100%;
`;

export const Status = styled.div`
  color: #6b7280;
`;

export const NamePerson = styled.div`
  font-weight: 700;
  font-size: 26px;
  line-height: 1.75rem;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 9px;
  border-radius: 10px;
  margin-top: 12px;
  gap: 20px;
`;
export const AgePerson = styled.div``;
export const HandleStyle = styled(Handle)`
  background-color: #a8a29d !important;
  height: 0px !important;
  min-height: 0 !important;
  min-width: 0 !important;
`;
