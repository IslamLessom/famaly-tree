import React from "react";
import {
  CheckboxHusband,
  SelectInfo,
  CreateHusbantsBlock,
} from "./SpouseInput.styled";
import { FamilyMember } from "../../pages/Admin/types/Types";

interface SpouseInputProps {
  index: number;
  spouseValue: string | null;
  isDivorced: boolean;
  familyMembers: Array<FamilyMember>;
  onSpouseChange: (index: number, value: string | null) => void;
  onDivorceChange: (index: number, isChecked: boolean) => void;
}

const SpouseInput: React.FC<SpouseInputProps> = ({
  index,
  spouseValue,
  isDivorced,
  familyMembers,
  onSpouseChange,
  onDivorceChange,
}) => (
  <CreateHusbantsBlock>
    <SelectInfo
      value={spouseValue || ""}
      onChange={(e) => onSpouseChange(index, e.target.value)}
    >
      <option value="">Выберите супруга(у)</option>
      {familyMembers.map((member) => (
        <option key={member._id} value={member._id}>
          {member.name}
        </option>
      ))}
    </SelectInfo>
    <CheckboxHusband
      checked={isDivorced}
      onChange={(e) => {
        onDivorceChange(index, e.target.checked);
      }} // () => fix if error
    >
      {" "}
      Разведен?
    </CheckboxHusband>
  </CreateHusbantsBlock>
);

export default SpouseInput;
