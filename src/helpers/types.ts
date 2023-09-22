import type { ReactNode } from "react";

export interface Element_Drop {
  title: string;
  childs: Element_Drop[]; // using childs cause children is a reserved word
  opened?: boolean;
  isPage?: boolean;
  content: ReactNode;
  isMd?: boolean;
}

export const Empty_Element: Element_Drop = {
  title: "",
  childs: [],
  content: "",
}

export const Element_Keys = [
  "title",
  "opened",
  "isPage",
] as const