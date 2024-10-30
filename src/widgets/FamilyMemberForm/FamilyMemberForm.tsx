import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  ButtonSave,
  Container,
  ContainerInput,
  Title,
} from "./FamilyMemberForm.styled";

import axios from "axios";
import FamilyMemberInput from "../../shared/FamilyMemberInput/FamilyMemberInput";
import SpouseList from "../../shared/SpouseCreateList/SpouseCreateList";
import { FamilyMember } from "../../pages/Admin/types/Types";

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
    spouseId: null,
    isDivorced: false,
  });

  const [spouses, setSpouses] = useState<
    { id: number; value: string | null; isDivorced: boolean }[]
  >([{ id: Date.now(), value: null, isDivorced: false }]);

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

  const addHusbandBlock = () => {
    // Проверяем, есть ли хотя бы одно заполненное значение
    const hasEmptyValue = spouses.some(
      (spouse) => spouse.value === null || spouse.value === ""
    );

    if (hasEmptyValue) {
      alert("Пожалуйста, выберите супруга перед добавлением нового блока.");
      return; // Не добавляем новый блок, если есть пустые значения
    }

    // Добавляем новый блок
    setSpouses((prev) => [
      ...prev,
      { id: Date.now(), value: null, isDivorced: false },
    ]);
  };

  const handleChange = (index: number, value: string | null) => {
    const updatedSpouses = [...spouses];
    updatedSpouses[index].value = value; // Обновляем значение для конкретного супруга
    setSpouses(updatedSpouses);
  };

  const onChange = (index: number, isChecked: boolean) => {
    const updatedSpouses = [...spouses];
    updatedSpouses[index].isDivorced = isChecked; // Устанавливаем флаг "Разведен?" для конкретного супруга
    setSpouses(updatedSpouses);
  };

  const handleSave = async () => {
    if (formData.name && formData.birthday) {
      try {
        // Создаем массив пар супругов
        const newPairs = spouses.map((spouse) => ({
          spouseId: spouse.value || "",
          isDivorced: spouse.isDivorced,
        }));

        // Объединяем данные о члене семьи и супруге в один объект
        const memberData = {
          name: formData.name,
          birthday: formData.birthday,
          mother: formData.mother,
          father: formData.father,
          spouseId: newPairs.map((pair) => pair.spouseId), // Сохраняем всех супругов
          isDivorced: newPairs.some((pair) => pair.isDivorced), // Если хотя бы один разведён, то true
        };

        const memberResponse = familyMember
          ? await axios.put(
              `http://localhost:8000/tree/${familyMember._id}`,
              memberData
            )
          : await axios.post("http://localhost:8000/tree", memberData);

        onSave(memberResponse.data.member); // Обновляем состояние родителя

        alert("Данные успешно сохранены на сервере!");

        // Сброс формы после сохранения
        setFormData({
          _id: "",
          name: "",
          birthday: "",
          mother: null,
          father: null,
          spouseId: null,
          isDivorced: false,
        });

        setSpouses([{ id: Date.now(), value: null, isDivorced: false }]); // Сброс состояния супругов
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  return (
    <>
      <Container>
        <Title>{familyMember ? "Edit Member" : "Create Member"}</Title>
        <ContainerInput>
          <FamilyMemberInput
            name={formData.name || ""}
            birthday={formData.birthday || ""}
            mother={formData.mother}
            father={formData.father}
            onNameChange={handleNameChange}
            onBirthdayChange={handleBirthdayChange}
            onSelectChange={handleSelectChange}
            familyMembers={familyMembers}
          />

          {/* Компонент для добавления супругов */}
          <SpouseList
            spouses={spouses}
            familyMembers={familyMembers}
            handleChange={handleChange}
            onChange={onChange}
            addHusbandBlock={addHusbandBlock}
          />

          <ButtonSave onClick={handleSave}>
            {familyMember ? "Редактировать" : "Создать"}
          </ButtonSave>
        </ContainerInput>
      </Container>
    </>
  );
};

export default FamilyMemberForm;
