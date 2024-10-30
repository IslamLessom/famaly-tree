import React from "react";
import SpouseInput from "../SpouseInput/SpouseInput";
import { ButtonSave, HusbandsConatainer } from "./SpouseCreateList.styled";
import { FamilyMember } from "../../pages/Admin/types/Types";

interface SpouseListProps {
  spouses: { id: number; value: string | null; isDivorced: boolean }[];
  familyMembers: Array<FamilyMember>;
  handleChange: (index: number, value: string | null) => void;
  onChange: (index: number, isChecked: boolean) => void;
  addHusbandBlock: () => void;
}

const SpouseList: React.FC<SpouseListProps> = ({
  spouses,
  familyMembers,
  handleChange,
  onChange,
  addHusbandBlock,
}) => (
  <HusbandsConatainer>
    {spouses.map((spouse, index) => (
      <SpouseInput
        key={spouse.id}
        index={index}
        spouseValue={spouse.value}
        isDivorced={spouse.isDivorced}
        familyMembers={familyMembers}
        onSpouseChange={handleChange}
        onDivorceChange={onChange}
      />
    ))}
    <ButtonSave onClick={addHusbandBlock}>Добавить супруга</ButtonSave>
  </HusbandsConatainer>
);

export default SpouseList;
