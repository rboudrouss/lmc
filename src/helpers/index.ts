import type { ReactNode } from "react";
import discord from "../icons/discord.svg";
import facebook from "../icons/facebook.svg";
import instagram from "../icons/instagram.svg";
import twitter from "../icons/twitter.svg";
import youtube from "../icons/youtube.svg";
import linkedin from "../icons/linkedin.svg";
import Default from "../icons/default.svg";

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
  assos: AssosName[];
  persistant?: boolean;
  content?: string; // UNSAFE HTML
  link?: string;
  facType?: FacType[];
}

export const Element_Keys = ["title", "opened", "isPage"] as const;

export function assosToImg(assos: string) {
  if (assosNames.includes(<AssosName> assos) === false) return Default.src; // HACK kinda but hey

  if (assosSvg.includes(assos)) return `/assets/assos/${assos}.svg`;

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

  const diffDays = Math.sign(diff) * Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays === -1) return "Hier";

  if (diffDays > 0) return `Dans ${diffDays} jours`;
  return `Il y a ${-diffDays} jours`;
}

export function filterListBeforeYesterday(list: ActuT[]): ActuT[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return list.filter((actu) => {
    if (!actu.date) return true;

    return actu.date.getTime() >= today.getTime();
  });
}

export function sortListPostByDate(list: ActuT[]): ActuT[] {
  return list.sort((a, b) => {
    if (!a.date) return -1;
    if (!b.date) return 1;

    return a.date.getTime() - b.date.getTime();
  });
}

export function getIconSource(name: string) {
  if (icons[name]) return icons[name].src;
  return icons.default.src;
}

export const icons = {
  discord,
  facebook,
  instagram,
  twitter,
  youtube,
  linkedin,
  default: Default,
};

export const assosSvg = [
  "alias",
  "amsu",
  "bdac",
  "bds",
  "bicursiosite",
  "curieosity",
  "fablab",
  "lfdt",
  "bdepolytech",
  "su",
  "susciences",
  "sulettres",
  "susante",
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
  "bsu",
  "cia",
  "cmi",
  "connectome",
  "curieosity",
  "crous",
  "defis",
  "desndes",
  "enactus",
  "etugouv",
  "fablab",
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
  "bdepolytech",
  "psu",
  "psu_champi_final",
  "pwb",
  "robotech",
  "scdr",
  "sgmi",
  "solsu",
  "sprint",
  "su",
  "suesport",
  "sulettres",
  "super8",
  "susante",
  "susciences",
  "symbiose6",
  "timarcha",
  "topaero",
  "tvjussieu",
  "vfc",
  "vls",
] as const;

export type AssosName = typeof assosNames[number];

export const facTypes = ["lettre", "sciences", "medecine", "polytech"] as const;

export type FacType = typeof facTypes[number];
