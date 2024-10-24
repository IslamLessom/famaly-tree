import React, { useState } from "react";
import {
  CheckboxHusband,
  CreateHusbantsBlock,
  HusbandsConatainer,
  ButtonSave,
  SelectInfo,
  TitleCreateHusbant,
} from "./SpouseContainer.styled";
import { v4 as uuid } from "uuid";
import { FamilyMember } from "../../pages/Admin/types/Types";

interface Spouse {
  id: number; // Или string, если вы будете использовать строковые идентификаторы
}

interface Pair {
  id: string;
  spouseValue: string;
  isDivorced: boolean;
}

interface SpouseContainerProps {
  familyMembers: Array<FamilyMember>;
}

const SpouseContainerComponent: React.FC<SpouseContainerProps> = ({
  familyMembers,
}) => {
  const [spouses, setSpouses] = useState<
    { id: number; value: string | null; isDivorced: boolean }[]
  >([{ id: Date.now(), value: null, isDivorced: false }]);

  const [pair, setPair] = useState<Pair[]>([]); // Для хранения пар супругов

  const addHusbandBlock = () => {
    // Проверяем, есть ли хотя бы одно заполненное значение
    const hasEmptyValue = spouses.some(
      (spouse) => spouse.value === null || spouse.value === ""
    );

    if (hasEmptyValue) {
      alert("Пожалуйста, выберите супруга перед добавлением нового блока.");
      return; // Не добавляем новый блок, если есть пустые значения
    }

    // Добавляем текущее состояние в edges
    const newPair = spouses.map((spouse) => ({
      id: uuid(),
      spouseValue: spouse.value || "",
      isDivorced: spouse.isDivorced,
    }));

    setPair((prevPair) => [...prevPair, ...newPair]);

    // Добавляем новый блок
    setSpouses((prev) => [
      ...prev,
      { id: Date.now(), value: null, isDivorced: false },
    ]);
  };
  const handleChange = (index: number) => (value: string | null) => {
    const updatedSpouses = [...spouses];
    updatedSpouses[index].value = value; // Обновляем значение для конкретного супруга
    setSpouses(updatedSpouses);
  };

  const onChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSpouses = [...spouses];
      updatedSpouses[index].isDivorced = e.target.checked; // Устанавливаем флаг "Разведен?" для конкретного супруга
      setSpouses(updatedSpouses);
    };

  return (
    <HusbandsConatainer>
      {spouses.map((spouse, index) => (
        <CreateHusbantsBlock key={spouse.id}>
          <TitleCreateHusbant>Супруг {index + 1}</TitleCreateHusbant>
          <SelectInfo
            placeholder="Выберите супруга(у)"
            value={spouse.value || ""}
            onChange={(e) => handleChange(index)(e.target.value)}
          >
            <option value="">Select spouse</option>
            {familyMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </SelectInfo>
          <CheckboxHusband
            checked={spouse.isDivorced}
            onChange={onChange(index)}
          >
            Разведен?
          </CheckboxHusband>
        </CreateHusbantsBlock>
      ))}
      <ButtonSave onClick={addHusbandBlock}>Add</ButtonSave>
    </HusbandsConatainer>
  );
};

export default SpouseContainerComponent;
