import type { MarkdownInstance } from "astro";
import {
  type ActuT,
  type Affiliations,
  type TypeActus,
  parseDateFromString,
} from ".";

export function filterActus(
  l: ActuT[],
  aff?: Affiliations,
  typeA?: TypeActus
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

export function filterActusBeforeYesterday(list: ActuT[]): ActuT[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return list.filter((actu) => {
    if (!actu.date) return true;

    return actu.date.getTime() >= today.getTime();
  });
}

export function sortListActusByDate(list: ActuT[]): ActuT[] {
  return list.sort((a, b) => {
    if (!a.date) return -1;
    if (!b.date) return 1;

    return a.date.getTime() - b.date.getTime();
  });
}

export function treatRawActus(
  list: MarkdownInstance<any>[],
  aff?: Affiliations,
  typeA?: TypeActus
): ActuT[] {
  let actus = sortListActusByDate(filterActus(rawMdsToActus(list), aff, typeA));
  if (typeA !== "actualites") return filterActusBeforeYesterday(actus);
  return actus;
}
