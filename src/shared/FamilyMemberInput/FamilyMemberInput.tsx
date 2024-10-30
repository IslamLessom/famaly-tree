import React from "react";
import { UploadInfo, SelectInfo } from "./FamalyMemberInput.styled.ts";
import { FamilyMember } from "../../pages/Admin/types/Types.ts";

interface FamilyMemberInputProps {
  name: string;
  birthday: string;
  mother?: string | null;
  father?: string | null;
  onNameChange: (value: string) => void;
  onBirthdayChange: (value: string) => void;
  onSelectChange: (
    fieldName: "mother" | "father"
  ) => (value: string | null) => void;
  familyMembers: Array<FamilyMember>;
}

const FamilyMemberInput: React.FC<FamilyMemberInputProps> = ({
  name,
  birthday,
  mother,
  father,
  onNameChange,
  onBirthdayChange,
  onSelectChange,
  familyMembers,
}) => (
  <>
    <UploadInfo
      name="name"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
      placeholder="Ф.И.О"
    />
    <UploadInfo
      name="birthday"
      type="date"
      value={birthday}
      onChange={(e: any) => onBirthdayChange(e.target.value)}
    />
    <SelectInfo
      value={mother || ""}
      onChange={(e) => onSelectChange("mother")(e.target.value)}
    >
      <option value="">Выберите маму</option>
      {familyMembers.map((member) => (
        <option key={member._id} value={member._id}>
          {member.name}
        </option>
      ))}
    </SelectInfo>
    <SelectInfo
      value={father || ""}
      onChange={(e) => onSelectChange("father")(e.target.value)}
    >
      <option value="">Выберите отца</option>
      {familyMembers.map((member) => (
        <option key={member._id} value={member._id}>
          {member.name}
        </option>
      ))}
    </SelectInfo>
  </>
);

export default FamilyMemberInput;
