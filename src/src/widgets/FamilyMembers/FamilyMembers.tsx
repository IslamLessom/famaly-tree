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
} from "./FamalyMembers.styled";
import { FamilyMember } from "../../pages/Admin/types/Types";
import axios from "axios";

interface FamilyMembersComponentProps {
  onEdit: (_id: string | null) => void;
}

export const FamilyMembers = ({ onEdit }: FamilyMembersComponentProps) => {
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса
  const [getMembers, setGetMembers] = useState<Array<FamilyMember>>([]); // Состояние для хранения поискового запроса

  // Функция для фильтрации членов семьи по имени
  const filteredMembers = getMembers.filter((member) =>
    member?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/tree");
        setGetMembers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <FamilyMembersContainer>
      <SearchInput
        type="text"
        placeholder="Поиск по имени..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние при вводе
      />
      {filteredMembers.map((member: string | any) => (
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
