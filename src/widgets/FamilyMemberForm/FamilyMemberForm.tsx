import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  ButtonSave,
  Container,
  ContainerInput,
  CreateFormContainerStyle,
  SelectInfo,
  Title,
  UploadInfo,
} from "./FamilyMemberForm.styled";
import SpouseContainerComponent from "../SpouseCreateContainer/SpouseContainer";
export interface FamilyMember {
  id?: string;
  name: string;
  birthDate: string;
  mother?: string | null;
  father?: string | null;
}

interface FamilyMemberFormProps {
  familyMember?: FamilyMember; // Для редактирования
  onSave: (member: FamilyMember) => void; // Функция для сохранения
  familyMembers: Array<FamilyMember>; // Для выбора родителей
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  familyMember,
  onSave,
  familyMembers,
}) => {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    name: "",
    birthDate: "",
    mother: null,
    father: null,
  });

  useEffect(() => {
    if (familyMember) {
      setFormData(familyMember);
    }
  }, [familyMember]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange =
    (fieldName: "mother" | "father") => (value: string | null) => {
      console.log(`Selected ${fieldName}:`, value);
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  const handleSave = () => {
    if (formData.name && formData.birthDate) {
      onSave({
        ...formData,
        id: familyMember ? familyMember.id : uuid(), // Устанавливаем ID только при редактировании
      } as FamilyMember);
      setFormData({ name: "", birthDate: "", mother: null, father: null }); // Сбрасываем форму
    }
  };

  return (
    <CreateFormContainerStyle>
      <Container>
        <Title>{familyMember ? "Edit Member" : "Create Member"}</Title>
        <ContainerInput>
          <UploadInfo
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Ф.И.О"
          />
          <UploadInfo
            name="birthDate"
            type="date"
            value={formData.birthDate || ""}
            onChange={handleInputChange}
          />
          <SelectInfo
            placeholder="Выберите маму"
            value={formData.mother || ""} // Установите значение для селектора
            onChange={(e) => handleSelectChange("mother")(e.target.value)}
          >
            <option value="">Select Mother</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </SelectInfo>
          <SelectInfo
            placeholder="Выберите отца"
            value={formData.father || ""} // Установите значение для селектора
            onChange={(e) => handleSelectChange("father")(e.target.value)}
          >
            <option value="">Select Father</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </SelectInfo>
          <SpouseContainerComponent familyMembers={familyMembers} />
          <ButtonSave onClick={handleSave}>
            {familyMember ? "Update" : "Create"}
          </ButtonSave>
        </ContainerInput>
      </Container>
    </CreateFormContainerStyle>
  );
};

export default FamilyMemberForm;
