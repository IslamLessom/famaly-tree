import { ReactNode } from "react";

export interface OpenDrawerProps {
  titleButton?: string;
  titleDrawed?: string;
  image?: ReactNode;
  children: ReactNode;
}
