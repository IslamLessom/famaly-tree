import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  AdminContainer,
  Container,
  CreateContainer,
  Title,
} from "./Admin.styled";
import { FamilyMembers } from "../../widgets/FamilyMembers/FamilyMembers";
import { FamilyMember } from "./types/Types";
import FamilyMemberForm from "../../widgets/FamilyMemberForm/FamilyMemberForm";

const Admin = () => {
  const [activeFamilyMemberId, setActiveFamilyMemberId] = useState<
    string | null
  >(null);
  const [familyMembers, setFamilyMembers] = useState<Array<FamilyMember>>([]);

  const handleCreateFamilyMember = (createdFamilyMember: FamilyMember) => {
    setFamilyMembers((prev) => [
      ...prev,
      {
        id: uuid(),
        ...createdFamilyMember,
      },
    ]);
  };

  const updateFamilyMember = (updatedMember: FamilyMember) => {
    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setActiveFamilyMemberId(null); // Сбрасываем активный ID после обновления
  };

  const onEdit = (id: React.SetStateAction<string | null>) => {
    console.log("Editing member with ID:", id);
    setActiveFamilyMemberId(id);
  };

  return (
    <AdminContainer>
      <Container>
        <FamilyMembers
          familyMembers={familyMembers}
          onEdit={onEdit} // Передаем функцию onEdit
        />
        {activeFamilyMemberId != null ? (
          <CreateContainer>
            <Title>Edit Node</Title>
            <FamilyMemberForm
              familyMember={familyMembers.find(
                (member) => member.id === activeFamilyMemberId
              )}
              familyMembers={familyMembers}
              onSave={updateFamilyMember}
            />
          </CreateContainer>
        ) : (
          <CreateContainer>
            <Title>Create Node</Title>
            <FamilyMemberForm
              onSave={handleCreateFamilyMember}
              familyMembers={familyMembers}
            />
          </CreateContainer>
        )}
      </Container>
    </AdminContainer>
  );
};

export default Admin;
