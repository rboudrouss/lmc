import type { MarkdownInstance } from "astro";
import type {
  Assos,
  Affiliations,
  TypeAsso,
  ActuT,
} from "./types";

export * from "./types";

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
    filename: e.file.split("/").pop().split(".")[0],
  };
}

export function rawMDsToAssos(e: MarkdownInstance<Assos>[]): Assos[] {
  return e.map(rawMDAssosToAssos);
}

export function filterAssos(
  l: Assos[],
  aff: Affiliations,
  type: TypeAsso
): Assos[] {
  if (!aff && !type) return l;
  return l.filter((asso) => {
    if (aff && asso.affiliation?.includes(aff) === false) return false;
    if (type && asso.typeasso?.includes(type) === false) return false;
    return true;
  });
}

export function filterActus(
  l: ActuT[],
  aff: Affiliations,
  typeA: TypeAsso
): ActuT[] {
  if (!aff && !typeA) return l;
  return l.filter((actu) => {
    if (aff && actu.affiliation?.includes(aff) === false) return false;
    if (typeA && actu.url.split("/").includes(typeA) === false) return false;
    return true;
  });
}

export function rawMdToActu(e: MarkdownInstance<any>): ActuT {
  return {
    date: parseDateFromString(e.frontmatter.date),
    title: e.frontmatter.title,
    auteur:
      typeof e.frontmatter.auteur === "string"
        ? [e.frontmatter.auteur]
        : e.frontmatter.auteur ?? [],
    image: e.frontmatter.image,
    source: e.frontmatter.source,
    affiliation:
      typeof e.frontmatter.affiliation === "string"
        ? [e.frontmatter.affiliation]
        : e.frontmatter.affiliation ?? [],
    url: e.url,
    icons: [],
    content: e.Content,
  };
}

export function rawMdsToActus(e: MarkdownInstance<any>[]): ActuT[] {
  return e.map(rawMdToActu);
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
