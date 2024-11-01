import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styled from "styled-components";
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
  Options,
  Status,
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
        <Options>
          <Status>{data?.spouse?.married_status}</Status>
        </Options>
        <FullContainer>
          <ContainerChild>
            <NodeImage src={Image} alt="" />
            <ContainerPerson>
              <NamePerson>{data.name}</NamePerson>
              <AgePerson>{formattedDate}</AgePerson>
            </ContainerPerson>
          </ContainerChild>
        </FullContainer>
        <HandleStyle type="source" position={Position.Bottom} />
      </Node>
    </NodeContainer>
  );
});
