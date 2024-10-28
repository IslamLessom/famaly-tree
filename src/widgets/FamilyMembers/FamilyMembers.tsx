import React, { useEffect, useState } from "react";
import Image from "../../../public/image.png";
import {
  FamilyMemberStyle,
  FamilyMembersContainer,
  ImageMember,
  MemberDate,
  MemberInfoBlock,
  MemberName,
  SearchInput,
} from "./FamalyMembers.styled"; // Убедитесь, что у вас есть стиль для SearchInput
import { FamilyMember } from "../../pages/Admin/types/Types";

interface FamilyMembersComponentProps {
  familyMembers: FamilyMember[];
  onEdit: (_id: string | null) => void;
}

export const FamilyMembers = ({
  familyMembers,
  onEdit,
}: FamilyMembersComponentProps) => {
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса

  // Функция для фильтрации членов семьи по имени
  const filteredMembers = familyMembers.filter((member) =>
    member?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Этот эффект сработает при изменении familyMembers
  useEffect(() => {}, [familyMembers]);

  return (
    <FamilyMembersContainer>
      <SearchInput
        type="text"
        placeholder="Поиск по имени..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние при вводе
      />
      {filteredMembers.map((member) => (
        <FamilyMemberStyle key={member._id} onClick={() => onEdit(member._id)}>
          <ImageMember src={Image} />
          <MemberInfoBlock>
            <MemberName>{member.name}</MemberName>
            <MemberDate>{member.birthday}</MemberDate>
          </MemberInfoBlock>
        </FamilyMemberStyle>
      ))}
    </FamilyMembersContainer>
  );
};
