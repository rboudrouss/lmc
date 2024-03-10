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

  if (diffDays > 7) return `Le ${date.getDate()} ${numberToMonth(date.getMonth())}`

  if (diffDays > 0) return `Dans ${diffDays} jours`;
  return `Il y a ${-diffDays} jours`;
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