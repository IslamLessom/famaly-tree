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
import axios from "axios";
import { Tabs } from "antd";
import SpouseEdit from "../SpouseEdit/SpouseEdit";

export interface FamilyMember {
  _id?: string; // MongoDB ID
  name: string;
  birthday: string;
  mother?: string | null;
  father?: string | null;
}

interface FamilyMemberFormProps {
  familyMember?: FamilyMember; // For editing
  onSave: (member: FamilyMember) => void; // Function for saving
  familyMembers: Array<FamilyMember>; // For selecting parents
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  familyMember,
  onSave,
  familyMembers,
}) => {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    _id: uuid(),
    name: "",
    birthday: "",
    mother: null,
    father: null,
  });

  useEffect(() => {
    if (familyMember) {
      setFormData(familyMember);
    }
  }, [familyMember]);

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleBirthdayChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      birthday: value,
    }));
  };

  const handleSelectChange =
    (fieldName: "mother" | "father") => (value: string | null) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    };

  const handleSave = async () => {
    if (formData.name && formData.birthday) {
      try {
        const response = familyMember
          ? await axios.put(
              `http://localhost:8000/create-tree/${familyMember._id}`, // Correct endpoint for updating
              {
                name: formData.name,
                birthday: formData.birthday, // Исправлено название поля на 'birthday'
                mother: formData.mother,
                father: formData.father,
              }
            )
          : await axios.post("http://localhost:8000/create-tree", {
              name: formData.name,
              birthday: formData.birthday,
              mother: formData.mother,
              father: formData.father,
            });

        onSave(response.data); // Call onSave to update parent state
      } catch (error) {
        console.error("Error saving data:", error);
      }

      setFormData({
        _id: "",
        name: "",
        birthday: "",
        mother: null,
        father: null,
      }); // Reset form after save
    }
  };

  // Define items for Tabs
  const items = [
    {
      key: "1",
      label: "Создать человека",
      children: (
        <CreateFormContainerStyle>
          <Container>
            <Title>{familyMember ? "Edit Member" : "Create Member"}</Title>
            <ContainerInput>
              <UploadInfo
                name="name"
                value={formData.name || ""}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ф.И.О"
              />
              <UploadInfo
                name="birthday"
                type="date"
                value={formData.birthday || ""}
                onChange={(e) => handleBirthdayChange(e.target.value)}
              />
              <SelectInfo
                value={formData.mother || ""}
                onChange={(e) => handleSelectChange("mother")(e.target.value)}
              >
                <option value="">Выберите маму</option>
                {familyMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </SelectInfo>
              <SelectInfo
                value={formData.father || ""}
                onChange={(e) => handleSelectChange("father")(e.target.value)}
              >
                <option value="">Выберите отца</option>
                {familyMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </SelectInfo>

              <ButtonSave onClick={handleSave}>
                {familyMember ? "Update" : "Create"}
              </ButtonSave>
            </ContainerInput>
          </Container>
        </CreateFormContainerStyle>
      ),
    },
    familyMember
      ? null
      : {
          key: "2",
          label: "Создать зависимость",
          children: (
            <CreateFormContainerStyle>
              <SpouseContainerComponent
                familyMembers={familyMembers}
                formData={formData}
              />
            </CreateFormContainerStyle>
          ),
        },
    {
      key: "3",
      label: "Редактировать зависимости",
      children: <SpouseEdit />,
    },
  ].filter(Boolean); // Удаляем любые null элементы

  return (
    <>
      <Tabs style={{ marginLeft: "30px" }} defaultActiveKey="1" items={items} />
    </>
  );
};

export default FamilyMemberForm;
