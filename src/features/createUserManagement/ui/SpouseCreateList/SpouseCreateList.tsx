import React from "react";
import SpouseInput from "../SpouseInput/SpouseInput";
import { HusbandsConatainer } from "../SpouseList/SpouseList.styled";
import { FamilyMember } from "../../../../pages/Admin/types/Types";

interface SpouseListProps {
  spouses: { id: number; value: string | null; isDivorced: boolean }[];
  familyMembers: Array<FamilyMember>;
  handleChange: (index: number, value: string | null) => void;
  onChange: (index: number, isChecked: boolean) => void;
}

const SpouseList: React.FC<SpouseListProps> = ({
  spouses,
  familyMembers,
  handleChange,
  onChange,
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
  </HusbandsConatainer>
);

export default SpouseList;
