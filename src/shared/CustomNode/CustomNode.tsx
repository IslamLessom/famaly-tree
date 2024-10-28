import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styled from "styled-components";
import Image from "../../../public/image.png";
import {
  AgePerson,
  ContainerChild,
  ContainerPerson,
  FullContainer,
  NamePerson,
  Node,
  NodeContainer,
  NodeImage,
  Options,
  Status,
} from "./CustomNode.styled";

export const CustomNode = memo(({ data }: any) => {
  return (
    <NodeContainer>
      <Node>
        <Handle type="target" position={Position.Top} />
        <Options>
          <Status>{data?.spouse?.married_status}</Status>
        </Options>
        <FullContainer>
          <ContainerChild>
            <NodeImage src={Image} alt="" />
            <ContainerPerson>
              <NamePerson>{data.name}</NamePerson>
              <AgePerson>{data.birthday}</AgePerson>
            </ContainerPerson>
          </ContainerChild>
        </FullContainer>
        <Handle type="source" position={Position.Bottom} />
      </Node>
    </NodeContainer>
  );
});
