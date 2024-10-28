import React, { useState } from "react";
import {
  CheckboxHusband,
  CreateHusbantsBlock,
  HusbandsConatainer,
  ButtonSave,
  SelectInfo,
  TitleCreateHusbant,
} from "./SpouseContainer.styled";
import axios from "axios"; // Импортируем axios для запросов
import { FamilyMember } from "../../pages/Admin/types/Types";

interface Spouse {
  spouse1: string | null; // ID выбранного супруга
  spouse2: string | null; // ID создаваемого супруга
  isDivorced: string | null; // Статус развода
}

interface SpouseContainerProps {
  familyMembers: Array<FamilyMember>;
}

const SpouseContainerComponent: React.FC<SpouseContainerProps> = ({
  familyMembers,
}) => {
  const [spouse, setSpouse] = useState<Spouse>({
    spouse1: null,
    spouse2: null,
    isDivorced: null,
  });

  const addHusbandBlock = async () => {
    if (!spouse.spouse1 || !spouse.spouse2 || !spouse.isDivorced) {
      alert("Пожалуйста, выберите обоих супругов перед добавлением.");
      return; // Не добавляем новый блок, если есть пустые значения
    }

    try {
      // Отправка данных о супруге на сервер
      await axios.post("http://localhost:8000/create-spouse", spouse);
      alert("Супруг успешно добавлен!");
    } catch (error) {
      console.error("Ошибка при добавлении супруга:", error);
      alert("Ошибка при добавлении супруга");
    }
  };

  const handleChange = (field: keyof Spouse) => (value: string | null) => {
    setSpouse((prev) => ({
      ...prev,
      [field]: value, // Обновляем значение для конкретного поля
    }));
  };

  return (
    <HusbandsConatainer>
      <CreateHusbantsBlock>
        <TitleCreateHusbant>Создание связи</TitleCreateHusbant>
        <SelectInfo
          value={spouse.spouse1 || ""}
          onChange={(e) => handleChange("spouse1")(e.target.value)}
        >
          <option value="">Выберите родительский компонент</option>
          {familyMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name} {/* Отображаем имя, но сохраняем ID */}
            </option>
          ))}
        </SelectInfo>
        <SelectInfo
          value={spouse.spouse2 || ""}
          onChange={(e) => handleChange("spouse2")(e.target.value)}
        >
          <option value="">Выберите дочерний компонент</option>
          {familyMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name} {/* Отображаем имя, но сохраняем ID */}
            </option>
          ))}
        </SelectInfo>
        <SelectInfo
          value={spouse.isDivorced || ""}
          onChange={(e) => handleChange("isDivorced")(e.target.value)}
        >
          <option value="">Выберите связь</option>

          <option value="Сын">Сын</option>
          <option value="Дочь">Дочь</option>
          <option value="Жена">Жена</option>
          <option value="Муж">Муж</option>
        </SelectInfo>
      </CreateHusbantsBlock>

      <ButtonSave onClick={addHusbandBlock}>Добавить</ButtonSave>
    </HusbandsConatainer>
  );
};

export default SpouseContainerComponent;
