import { FamilyMember } from "../../../pages/Admin/types/Types";

export interface FamilyMemberFormProps {
  familyMember?: FamilyMember; // For editing
  onSave: (member: FamilyMember) => void; // Function for saving
  familyMembers: Array<FamilyMember>; // For selecting parents
}
