export interface CreatedFamilyMember {
  name: string;
  birthDate: string;
  mother: string | null;
  father: string | null;
}

export interface FamilyMember {
  id?: string;
  name: string;
  birthDate: string;
  mother?: string | null;
  father?: string | null;
}
