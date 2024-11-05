import { memo } from "react";
import { Position } from "@xyflow/react";
import Image from "../../../../public/image.png";
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
  const DateBirthday = new Date(data.member.birthday);
  const formattedDate = DateBirthday.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, ".");

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
