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
  box-shadow: 1px 1px 1px 1px #00000042;
  height: 200px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  box-shadow: 1px 1px 1px 1px #00000042;
`;

export const ContainerPerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 0px;
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

export const AgePerson = styled.div`
  font-weight: 200;
  font-size: 15px;
  line-height: 1rem;
`;
export const HandleStyle = styled(Handle)`
  background-color: #a8a29d !important;
  height: 0px !important;
  min-height: 0 !important;
  min-width: 0 !important;
`;
export const ContainerChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  gap: 20px;
`;
export const PairContinerForImageStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const PairContinerForInfoUserStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
