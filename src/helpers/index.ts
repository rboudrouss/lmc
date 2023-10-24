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
};

export const Element_Keys = ["title", "opened", "isPage"] as const;

export function assosToImg(assos: string) {
  if (assosNames.includes(assos) === false) return undefined;

  if (assosSvg.includes(assos)) return `assests/assos/${assos}.svg`;

  return `assets/assos/${assos}.png`;
}

export function parseDateFromString(dateString: string): Date | null {
  const dateParts = dateString.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+)/);

  if (!dateParts) {
    return undefined; // Invalid format
  }

  const intsParts = dateParts.slice(1).map((part) => parseInt(part, 10));
  intsParts[1]--; // Month is 0-based

  if (intsParts.some((part) => isNaN(part) || part < 0 || part > 59)) {
    return undefined; // Invalid numbers
  }

  return new Date(...intsParts);
}

export const assosSvg = [
  "alias",
  "amsu",
  "bdac",
  "bds",
  "bicursiosite",
  "curiosity",
  "lfdt",
  "polytech",
];

export const assosNames = [
  "acidsu",
  "adlsd",
  "aebip",
  "aeg",
  "agep",
  "alias",
  "alliance",
  "almamater",
  "ami",
  "amsu",
  "assusim",
  "avebmc",
  "axio",
  "bdac",
  "bds",
  "bicursiosite",
  "cia",
  "cmi",
  "connectome",
  "curieosity",
  "defis",
  "desndes",
  "enactus",
  "gobee",
  "heforshe",
  "interreagir",
  "invivo",
  "isee",
  "isup",
  "jam",
  "js2",
  "lasixe",
  "lfdt",
  "lupa",
  "luxfabrica",
  "moktar",
  "outdated",
  "parismus",
  "polycoeur",
  "polypeip",
  "polytech",
  "psu",
  "psu_champi_final",
  "pwb",
  "robotech",
  "sgmi",
  "solsu",
  "sprint",
  "suesport",
  "super8",
  "symbiose6",
  "timarcha",
  "topaero",
  "tvjussieu",
  "vfc",
  "vls",
];
