export interface Assos {
  acronyme?: string;
  titre: string;
  affiliation?: Affiliations[];
  typeasso?: TypeAsso[];
  logo: string;
  logooriginal?: string;
  description?: string;
  video?: string;
  links?: LinksAssos;
  url?: string;
  filename: string;
}

export interface ActuT {
  date?: Date;
  title: string;
  auteur: string[];
  image?: string;
  source?: string;
  affiliation?: Affiliations[];
  url: string;
  icons?: string[];
  content: any; // TODO
}

export type TypeAsso =
  | "filiere"
  | "cursus"
  | "ludique"
  | "mediatique"
  | "artistique"
  | "evenementiel"
  | "sports"
  | "solidarite"
  | "ecologie"
  | "entrepreneuriat"
  | "debat"
  | "feminisme"
  | "syndicat"
  | "autre";

export type Affiliations =
  | "su"
  | "sciences"
  | "lettres"
  | "sante"
  | "polytech"
  | "celsa";

export type LinksAssos = Record<string, string>;

export const facTypes = ["lettre", "sciences", "medecine", "polytech"] as const;

export type FacType = (typeof facTypes)[number];
