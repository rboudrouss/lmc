import type { MarkdownInstance } from "astro";
import {
  type Assos,
  type Affiliations,
  type TypeAsso,
  sortAffiliations,
} from ".";

export function rawMDAssosToAssos(e: MarkdownInstance<Assos>): Assos {
  return {
    acronyme: e.frontmatter.acronyme,
    titre: e.frontmatter.titre,
    affiliation: sortAffiliations(
      typeof e.frontmatter.affiliation === "string"
        ? [e.frontmatter.affiliation]
        : e.frontmatter.affiliation ?? []
    ),
    typeasso:
      typeof e.frontmatter.typeasso === "string"
        ? [e.frontmatter.typeasso]
        : e.frontmatter.typeasso ?? [],
    logo: e.frontmatter.logo,
    logooriginal: e.frontmatter.logooriginal,
    description: e.frontmatter.description,
    video: e.frontmatter.video,
    links: e.frontmatter.links,
    url: e.url,
    filename: e.file.split("/").pop().split(".")[0],
    info: e.frontmatter.info,
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
