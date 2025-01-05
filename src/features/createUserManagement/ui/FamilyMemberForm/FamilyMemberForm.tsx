import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import FamilyMemberInput from "../FamilyMemberInput/FamilyMemberInput";
import SpouseList from "../SpouseList/SpouseList";
import {
  ButtonSave,
  Container,
  ContainerInput,
  Title,
} from "./FamilyMemberForm.styled";
import { FamilyMemberFormProps } from "../../model/types";
import { FamilyMember } from "../../../../pages/Admin/types/Types";

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
  familyMember,
  onSave,
  familyMembers,
}) => {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    _id: uuid(),
    name: "",
    birthday: "",
    dateOfDeath: "",
    mother: null,
    father: null,
    spouseId: null,
    isDivorced: false,
    photoUrl: null,
  });

  const [spouses, setSpouses] = useState<
    { id: number; value: string | null; isDivorced: boolean }[]
  >([{ id: Date.now(), value: null, isDivorced: false }]);

  useEffect(() => {
    if (familyMember) {
      setFormData(familyMember);
    }
  }, [familyMember]);

  const handleFileChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      photoUrl: event.target.files[0], // Сохраняем выбранный файл
    }));
  };

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
  const handleDateOfDeathChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      dateOfDeath: value,
    }));
  };

  const handleSelectChange =
    (fieldName: "mother" | "father") => (value: string | null) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value === "null" ? null : value, // Убедитесь, что устанавливается null
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
    const { name, birthday, dateOfDeath, mother, father, photoUrl } = formData;

    if (!name || !birthday) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("birthday", new Date(birthday).toISOString());
    formDataToSend.append(
      "dateOfDeath",
      dateOfDeath ? new Date(dateOfDeath).toISOString() : ""
    );

    // Helper function to append optional fields
    const appendOptionalField = (key: any, value: any) => {
      formDataToSend.append(key, value ?? "");
    };

    appendOptionalField("mother", mother === "null" ? null : mother);
    appendOptionalField("father", father === "null" ? null : father);

    const spouseIdValue =
      spouses[0]?.value === "null" ? null : spouses[0]?.value;

    // Функция для проверки корректности ObjectId
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    // Проверяем, является ли spouseIdValue допустимым перед добавлением
    if (spouseIdValue && isValidObjectId(spouseIdValue)) {
      formDataToSend.append("spouseId", spouseIdValue);
    } else {
      formDataToSend.append("spouseId", null); // Используем null вместо пустой строки
    }
    formDataToSend.append(
      "isDivorced",
      String(spouses[0]?.isDivorced || false)
    );

    if (photoUrl) {
      formDataToSend.append("photo", photoUrl);
    }

    try {
      const url = familyMember
        ? `http://localhost:8000/tree/${familyMember._id}`
        : "http://localhost:8000/tree";

      const method = familyMember ? axios.put : axios.post;
      const memberResponse = await method(url, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSave(memberResponse.data.member);

      // Reset form state
      resetForm();
    } catch (error: any) {
      console.error(
        "Ошибка при сохранении данных:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Helper function to reset the form state
  const resetForm = () => {
    setFormData({
      _id: "",
      name: "",
      birthday: "",
      dateOfDeath: "",
      mother: null,
      father: null,
      spouseId: null,
      isDivorced: false,
      photoUrl: null,
    });

    setSpouses([{ id: Date.now(), value: null, isDivorced: false }]);
  };

  return (
    <>
      <Container>
        <Title>
          {familyMember ? "Редактировать члена семьи" : "Создать члена семьи"}
        </Title>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginLeft: "145px", marginBottom: "20px" }}
        />
        <ContainerInput>
          <FamilyMemberInput
            name={formData.name || ""}
            birthday={formData.birthday || ""}
            dateOfDeath={formData.dateOfDeath || ""}
            mother={formData.mother}
            father={formData.father}
            onNameChange={handleNameChange}
            onBirthdayChange={handleBirthdayChange}
            onDateOfDeathChange={handleDateOfDeathChange}
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
