import { memo } from "react";
import {
  ContainerChild,
  ContainerPerson,
  FullContainer,
  HandleStyle,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
} from "../../shared/CustomNode/CustomNode.styled";
import Image from "../../../public/image.png";
import { Position } from "@xyflow/react";

export const PairNode = memo(({ data }: any) => {
  return (
    <NodeContainer>
      <Node>
        <HandleStyle type="target" position={Position.Top} />
        <FullContainer>
          <ContainerChild>
            <NodeImage src={Image} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <NamePerson>{data.members[0].name}</NamePerson>
              <NamePerson>{data.members[1].name}</NamePerson>
            </div>
          </ContainerChild>
        </FullContainer>
        <HandleStyle type="source" position={Position.Bottom} />
      </Node>
    </NodeContainer>
  );
});
