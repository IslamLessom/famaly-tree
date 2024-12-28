import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  ButtonSave,
  Container,
  ContainerInput,
  Title,
} from "./FamilyMemberForm.styled";

import axios from "axios";
import FamilyMemberInput from "../FamilyMemberInput/FamilyMemberInput";
import SpouseList from "../SpouseList/SpouseList";
import { FamilyMember } from "../../../../pages/Admin/types/Types";
import { FamilyMemberFormProps } from "../../model/types";

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
      // if (!hasParentOrSpouse) {
      //   alert("Пожалуйста, укажите хотя бы одного родителя или супруга."); // Сообщение об ошибке
      //   return; // Прекращаем выполнение функции
      // }
      try {
        // Объединяем данные о члене семьи и супруге в один объект
        const memberData = {
          name: formData.name,
          birthday: formData.birthday,
          mother: formData?.mother,
          father: formData?.father,
          spouseId: spouses[0]?.value, // Сохраняем только одного супруга
          isDivorced: spouses[0]?.isDivorced || false, // Если хотя бы один разведён, то true
        };
        console.log(memberData);
        const memberResponse = familyMember
          ? await axios.put(
              `http://localhost:8000/tree/${familyMember._id}`,
              memberData
            )
          : await axios.post("http://localhost:8000/tree", memberData);

        onSave(memberResponse.data.member); // Обновляем состояние родителя

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
      } catch (error: any) {
        console.error(
          "Error saving data:",
          error.response ? error.response.data : error.message
        );
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

          <SpouseList
            spouses={spouses}
            addHusbandBlock={() => {}}
            familyMembers={familyMembers}
            handleChange={handleChange}
            onChange={onChange}
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
