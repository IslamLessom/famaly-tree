export interface CreatedFamilyMember {
  name: string;
  birthDate: string;
  dateOfDeath?: string | null;
  mother?: string | null;
  father?: string | null;
  photoUrl?: null;
}

export interface FamilyMember {
  _id?: string; // MongoDB ID
  name: string;
  birthday: string;
  dateOfDeath: string | null;
  mother?: string | null;
  father?: string | null;
  spouseId?: string | null;
  isDivorced?: boolean;
  photoUrl?: null;
}

export interface IFamilyNode {
  id: string;
  data: {
    name: string;
    birthday: string;
    dateOfDeath: string | null;
    father: string;
    mother: string;
  };
  position: { x: number; y: number };
  type: string;
}
