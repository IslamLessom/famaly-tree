import React from "react";
import Image from "../../../public/image.png";
import {
  FamilyMemberStyle,
  FamilyMembersContainer,
  ImageMember,
  MemberDate,
  MemberInfoBlock,
  MemberName,
} from "./FamalyMembers.styled";
import { FamilyMember } from "../../pages/Admin/types/Types";

interface FamilyMembersComponentProps {
  familyMembers: FamilyMember[];
  onEdit: (id: string | null) => void; // Исправлено на правильный тип
}

export const FamilyMembers = ({
  familyMembers,
  onEdit,
}: FamilyMembersComponentProps) => {
  return (
    <FamilyMembersContainer>
      {familyMembers.map((member) => (
        <FamilyMemberStyle key={member.id} onClick={() => onEdit(member.id)}>
          <ImageMember src={Image} />
          <MemberInfoBlock>
            <MemberName>{member.name}</MemberName>
            <MemberDate>{member.birthDate}</MemberDate>
          </MemberInfoBlock>
        </FamilyMemberStyle>
      ))}
    </FamilyMembersContainer>
  );
};
