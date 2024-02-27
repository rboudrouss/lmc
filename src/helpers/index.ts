import type { ReactNode } from "react";
import discord from "../icons/discord.svg";
import facebook from "../icons/facebook.svg";
import instagram from "../icons/instagram.svg";
import twitter from "../icons/twitter.svg";
import youtube from "../icons/youtube.svg";
import linkedin from "../icons/linkedin.svg";
import Default from "../icons/default.svg";
import type { MDXInstance, MarkdownInstance } from "astro";

export interface Element_Drop {
  title: string;
  childs: Element_Drop[]; // using childs cause children is a reserved word
  opened?: boolean;
  isPage?: boolean;
  content: ReactNode;
  isMd?: boolean;
  persistant?: boolean;
}

export type TypeAsso =
  | "filiere"
  | "cursus"
  | "ludique"
  | "artistique"
  | "evenementiel"
  | "sports"
  | "solidarite"
  | "entrepreneuriat"
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

export interface LinksAssos {
  helloasso?: string;
  instagram?: string;
  discord?: string;
  youtube?: string;
  twitch?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  mail?: string;
  site?: string;
}

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
}

export function rawMDAssosToAssos(e: MarkdownInstance<Assos>): Assos {
  return {
    acronyme: e.frontmatter.acronyme,
    titre: e.frontmatter.titre,
    affiliation: e.frontmatter.affiliation ?? [],
    typeasso: e.frontmatter.typeasso ?? [],
    logo: e.frontmatter.logo,
    logooriginal: e.frontmatter.logooriginal,
    description: e.frontmatter.description,
    video: e.frontmatter.video,
    links: e.frontmatter.links,
    url: e.url,
  }
}

export function rawMDsToAssos(e: MarkdownInstance<Assos>[]): Assos[] {
  return e.map(rawMDAssosToAssos);
}

export function filterAssos(l: Assos[], aff: Affiliations, type: TypeAsso): Assos[] {
  if (!aff && !type) return l;
  return l.filter((asso) => {
    if (aff && asso.affiliation?.includes(aff) === false) return false;
    if (type && asso.typeasso?.includes(type) === false) return false;
    return true;
  });
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
  if (assosNames.includes(<AssosName>assos) === false) return Default.src; // HACK kinda but hey

  if (assosSvg.includes(assos)) return `/assets/logos/${assos}.svg`;

  return `/assets/logos/${assos}.png`;
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

  const diffDays =
    Math.sign(diff) * Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));

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
  "bdepolytech",
  "bds",
  "bicursiosite",
  "cinefac",
  "cop1",
  "curieosity",
  "lfdt",
  "lmc",
  "telesorbonne",
  "topaero",
  "su",
  "sse",
  "sciences",
  "lettres",
  "sante",
  "polytech",
  "celsa",
  "fablab",
  "capsule",
];

export const assosNames = [
  "6eme",
  "aces",
  "acidsu",
  "acoufem",
  "adal",
  "addhm",
  "adlsd",
  "aebip",
  "aeg",
  "aehsu",
  "aeosu",
  "aesf",
  "aesfpsa",
  "agep",
  "ajuca",
  "aladab",
  "alias",
  "alliance",
  "almamater",
  "amevs",
  "ami",
  "amsu",
  "apeo",
  "apeps",
  "aromaths",
  "arrimage",
  "as",
  "aumoneriecelsa",
  "avcpsa",
  "avebmc",
  "axio",
  "bdac",
  "bdeinspe",
  "bdeisup",
  "bdepolytech",
  "bds",
  "bicursiosite",
  "c2su",
  "celsaalumni",
  "celsaagora",
  "celsahuma",
  "cia",
  "cinefac",
  "cinepsis",
  "cmi",
  "collectifdoctoral",
  "comair",
  "comedscene",
  "connectome",
  "cop1",
  "curieosity",
  "dada",
  "debateclub",
  "debattreensorbonne",
  "defissorbonne",
  "demodocos",
  "desndes",
  "droithistoire",
  "effervescence",
  "effeuillage",
  "enactus",
  "encorps",
  "englishsociety",
  "fabula",
  "faispasgenre",
  "fcos",
  "galeriesorbonne",
  "geonautes",
  "gobee",
  "greenwave",
  "heforshe",
  "igem",
  "interreagir",
  "invivo",
  "isee",
  "jam",
  "js2",
  "junior",
  "kulturiste",
  "labaffe",
  "laclefdeschantsensemble",
  "lagazelle",
  "lamadeleine",
  "lasixe",
  "lasorbonnesonore",
  "lebanquet",
  "lecelsgreen",
  "lecomptoir",
  "lentracte",
  "lesconcertsdemidi",
  "lesfallopes",
  "lestudio",
  "lfdt",
  "lmc",
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
  "lpcpsa",
  "lpcsa",
  "ludiidf",
  "lupa",
  "luxfabrica",
  "madeinsorbonne",
  "maes",
  "medalo",
  "megen",
  "moktar",
  "neolectes",
  "oasis",
  "opiumphilosophie",
  "osiup",
  "parismus",
  "parolesdedefense",
  "pea",
  "philodoctes",
  "polycoeur",
  "polypeip",
  "pomm",
  "psagreen",
  "psart",
  "psf",
  "psu",
  "pwb",
  "revoltetoisorbonne",
  "robotech",
  "rsu",
  "scdr",
  "sgmi",
  "solidaires",
  "solsu",
  "sophia",
  "sorbonneantique",
  "sorbonnemusicdays",
  "sorboutremer",
  "sp6",
  "spiv",
  "splaaash",
  "sprint",
  "suesport",
  "super8",
  "susie",
  "symbiose6",
  "telesorbonne",
  "theatreallemand",
  "theatreux",
  "timarcha",
  "topaero",
  "tvjussieu",
  "ucph",
  "vertlascience",
  "winenot",
  "wolfpack",
  "crous",
  "etugouv",
  "su",
  "sse",
  "bsu",
  "sciences",
  "lettres",
  "sante",
  "polytech",
  "celsa",
  "fablab",
  "capsule",
] as const;

export type AssosName = (typeof assosNames)[number];

export const facTypes = ["lettre", "sciences", "medecine", "polytech"] as const;

export type FacType = (typeof facTypes)[number];
