import type { Affiliations } from ".";

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

export function DateEvenements(date?: Date): string {
  if (!date) return undefined;

  const today = new Date();

  const diff = date.getTime() - today.getTime();

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))+1;

  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";

  if (diffDays > 7) return `Le ${date.getDate()} ${numberToMonth(date.getMonth())}`;

  if (diffDays > 0) return `Dans ${diffDays} jours`;
}

export function DateEnCeMoment(date?: Date): string {
  if (!date) return undefined;

  const today = new Date();

  const diff = date.getTime() - today.getTime();

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))+1;

  if (diffDays === 0) return "Fini Aujourd'hui";
  if (diffDays === 1) return "Jusqu'à Demain";

  if (diffDays > 7) return `Jusq'au ${date.getDate()} ${numberToMonth(date.getMonth())}`;

  if (diffDays > 0) return `Plus que ${diffDays} jours`;
}

export function DateActualites(date?: Date): string {
  if (!date) return undefined;

  const today = new Date();

  const diff = date.getTime() - today.getTime();

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))+1;

  if (diffDays === 0) return "Posté Aujourd'hui";
  if (diffDays === -1) return "Posté Hier";
  if (diffDays === -2) return "Posté Avant-Hier";

  if (diffDays < -7) return `Posté le ${date.getDate()} ${numberToMonth(date.getMonth())}`;

  if (diffDays < 0) return `Posté il y a ${-diffDays} jours`;
}

export function numberToMonth(n: number) {
  if (n < 0 || n > 11) return undefined;

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  return months[n];
}

export const AffColor = {
  su: "#112970",
  sciences: "#56B7E6",
  lettres: "#FFB500",
  sante: "#A6192E",
  polytech: "#00ADEF",
  celsa: "#FFB500",
}

const ordreAffiliation: Affiliations[] = [
  "su",
  "sciences",
  "lettres",
  "sante",
  "polytech",
  "celsa",
]

export function sortAffiliations(affiliations: Affiliations[]): Affiliations[] {
  return affiliations.sort((a, b) => {
    return ordreAffiliation.indexOf(a) - ordreAffiliation.indexOf(b);
  });
}