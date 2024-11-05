import { memo } from "react";
import {
  ContainerChild,
  FullContainer,
  HandleStyle,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
  PairContinerForImageStyle,
  PairContinerForInfoUserStyle,
} from "./PairNode.styled";
import Image from "../../../../public/image.png";
import { Position } from "@xyflow/react";

export const PairNode = memo(({ data }: any) => {
  return (
    <NodeContainer>
      <Node>
        <HandleStyle type="target" position={Position.Top} />
        <FullContainer>
          <ContainerChild>
            <PairContinerForImageStyle>
              <NodeImage src={Image} alt="" />
              <NodeImage src={Image} alt="" />
            </PairContinerForImageStyle>
            <PairContinerForInfoUserStyle>
              <NamePerson>{data.members[0].name}</NamePerson>
              <NamePerson>{data.members[1].name}</NamePerson>
            </PairContinerForInfoUserStyle>
          </ContainerChild>
        </FullContainer>
        <HandleStyle type="source" position={Position.Bottom} />
      </Node>
    </NodeContainer>
  );
});
