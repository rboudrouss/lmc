import type { ReactNode } from "react";

export interface Element_Drop {
  title: string;
  childs: Element_Drop[]; // using childs cause children is a reserved word
  opened?: boolean;
  isPage?: boolean;
  content: ReactNode;
  isMd?: boolean;
  persistant?: boolean;
}

export const Empty_Element: Element_Drop = {
  title: "",
  childs: [],
  content: "",
};

export interface ActuT {
  title: string;
  date?: Date;
  img?: string;
  source?: string;
  assos: string[];
  persistant?: boolean;
  content?: string; // UNSAFE HTML
  link?: string;
}

export const Element_Keys = ["title", "opened", "isPage"] as const;

export function assosToImg(assos: string) {
  if (assosNames.includes(assos) === false) return undefined;

  if (assosSvg.includes(assos)) return `/assests/assos/${assos}.svg`;

  return `/assets/assos/${assos}.png`;
}

export function parseDateFromString(dateString?: string): Date | null {
  if (!dateString) return undefined;

  const dateParts = dateString.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+)/);

  if (!dateParts) {
    return undefined; // Invalid format
  }

  const intsParts = dateParts.slice(1).map((part) => parseInt(part, 10));
  intsParts[1]--; // Month is 0-based

  if (intsParts.some((part) => isNaN(part) || part < 0)) {
    return undefined; // Invalid numbers
  }

  return new Date(
    intsParts[2],
    intsParts[1],
    intsParts[0],
    intsParts[3],
    intsParts[4]
  );
}

export function dateToStringFromToday(date?: Date): string {
  if (!date) return undefined;

  const today = new Date();

  const diff = date.getTime() - today.getTime();

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === -1) return "Hier";

  if (diffDays > 0) return `Dans ${diffDays} jours`;
  return `Il y a ${-diffDays} jours`;
}

export function sortListPostByDate(list: ActuT[]): ActuT[] {
  return list.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;

    return b.date.getTime() - a.date.getTime();
  });
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
