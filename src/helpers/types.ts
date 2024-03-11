export interface Assos {
  acronyme?: string;
  titre: string;
  affiliation?: Affiliations[];
  typeasso?: TypeAsso[];
  logo: string;
  logooriginal?: string;
  description?: string;
  video?: string;
  links?: Record<string, string>;
  url?: string;
  filename: string;
  info?: Record<string, string>;
}

export interface ActuT {
  date?: Date;
  title: string;
  auteur: string[];
  image?: string;
  source?: string;
  affiliation?: Affiliations[];
  url: string;
  content: any; // TODO
  auteurInfo: Assos[];
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

export const facTypes = ["lettre", "sciences", "medecine", "polytech"] as const;

export type FacType = (typeof facTypes)[number];

export type TypeActus = "actualites" | "encemoment" | "evenements";
