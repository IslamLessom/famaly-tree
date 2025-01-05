import React from "react";
import { UploadInfo, SelectInfo } from "./FamalyMemberInput.styled.ts";
import { FamilyMember } from "../../../../pages/Admin/types/Types.ts";
import { Select } from "antd";

interface FamilyMemberInputProps {
  name: string;
  birthday: string;
  dateOfDeath: string;
  mother?: string | null;
  father?: string | null;
  onNameChange: (value: string) => void;
  onBirthdayChange: (value: string) => void;
  onDateOfDeathChange: (value: string) => void;
  onSelectChange: (
    fieldName: "mother" | "father"
  ) => (value: string | null) => void;
  familyMembers: Array<FamilyMember>;
}

const FamilyMemberInput: React.FC<FamilyMemberInputProps> = ({
  name,
  birthday,
  dateOfDeath,
  mother,
  father,
  onNameChange,
  onBirthdayChange,
  onDateOfDeathChange,
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
      placeholder="Выберите дату рождения"
      className="textbox-n"
      type="text"
      onFocus={() =>
        ((document.getElementById("date") as HTMLInputElement).type = "date")
      }
      onBlur={() =>
        ((document.getElementById("date") as HTMLInputElement).type = "text")
      }
      id="date"
      value={birthday}
      onChange={(e) => onBirthdayChange(e.target.value)}
    />
    <UploadInfo
      placeholder="Выберите дату смерти"
      className="textbox-n"
      type="text"
      onFocus={() =>
        ((document.getElementById("date2") as HTMLInputElement).type = "date")
      }
      onBlur={() =>
        ((document.getElementById("date2") as HTMLInputElement).type = "text")
      }
      id="date2"
      value={dateOfDeath}
      onChange={(e) => onDateOfDeathChange(e.target.value)}
    />
    <SelectInfo
      value={mother || ""}
      onChange={(value: unknown) => onSelectChange("mother")(value as string)}
    >
      <Select.Option value="">Выберите маму</Select.Option>
      {familyMembers.map((member) => (
        <Select.Option key={member._id} value={member._id}>
          {member.name}
        </Select.Option>
      ))}
    </SelectInfo>
    <SelectInfo
      value={father || ""}
      onChange={(value: unknown) => onSelectChange("father")(value as string)}
    >
      <Select.Option value="">Выберите отца</Select.Option>
      {familyMembers.map((member) => (
        <Select.Option key={member._id} value={member._id}>
          {member.name}
        </Select.Option>
      ))}
    </SelectInfo>
  </>
);

export default FamilyMemberInput;
