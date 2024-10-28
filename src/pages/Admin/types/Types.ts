export interface CreatedFamilyMember {
  name: string;
  birthDate: string;
  mother: string | null;
  father: string | null;
}

export interface FamilyMember {
  id(id: any): void;
  _id?: string;
  name: string;
  birthday: string;
  mother?: string | null;
  father?: string | null;
}

export interface IFamilyNode {
  id: string;
  data: {
    name: string;
    birthday: string;
    father: string;
    mother: string;
  };
  position: { x: number; y: number };
  type: string;
}
