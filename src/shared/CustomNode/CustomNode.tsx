import { memo } from "react";
import { Position } from "@xyflow/react";
import Image from "../../../public/image.png";
import {
  AgePerson,
  ContainerChild,
  ContainerPerson,
  FullContainer,
  HandleStyle,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
} from "./CustomNode.styled";

export const CustomNode = memo(({ data }: any) => {
  const DateBirthday = new Date(data.birthday);
  const formattedDate = `${String(DateBirthday.getDate()).padStart(
    2,
    "0"
  )} ${String(DateBirthday.getMonth() + 1).padStart(
    2,
    "0"
  )} ${DateBirthday.getFullYear()}`;

  return (
    <NodeContainer>
      <Node>
        <HandleStyle type="target" position={Position.Top} />
        <FullContainer>
          <ContainerChild>
            <NodeImage src={Image} alt="" />
            <ContainerPerson>
              <NamePerson>{data.member.name}</NamePerson>
              <AgePerson>{formattedDate}</AgePerson>
            </ContainerPerson>
          </ContainerChild>
        </FullContainer>
        <HandleStyle type="source" position={Position.Bottom} />
      </Node>
    </NodeContainer>
  );
});
