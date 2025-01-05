import React from "react";
import {
  CheckboxHusband,
  SelectInfo,
  CreateHusbantsBlock,
} from "./SpouseInput.styled";
import { FamilyMember } from "../../../../pages/Admin/types/Types";
import { Select } from "antd";

const { Option } = Select;

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
    <Select
      value={spouseValue || ""}
      onChange={(value: unknown) => onSpouseChange(index, value as string)}
      placeholder="Выберите супруга(у)"
    >
      <Option value="">Выберите супруга(у)</Option>
      {familyMembers.map((member) => (
        <Option key={member._id} value={member._id}>
          {member.name}
        </Option>
      ))}
    </Select>
    <CheckboxHusband
      checked={isDivorced}
      onChange={(e) => {
        onDivorceChange(index, e.target.checked);
      }}
    >
      Разведен?
    </CheckboxHusband>
  </CreateHusbantsBlock>
);

export default SpouseInput;
