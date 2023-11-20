import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import {
  assosNames,
  type ActuT,
  type AssosName,
  type FacType,
  facTypes,
} from "@/helpers";

import DateSelector from "./DateSelector/DateSelector";
import MultSelector from "./MultSelector/MultSelector";
import CheckBox from "./CheckBox/CheckBox";

import styles from "./Selector.module.css";

export interface SelectionT {
  tags?: AssosName[];
  persistant?: boolean;
  date_start?: Date;
  date_end?: Date;
  facType?: FacType[]; // TODO
}

export default function Selector(props: {
  onChange: (selection: SelectionT) => void;
}) {
  const queryParameters = new URLSearchParams(window.location.search);

  const [selection, setSelection] = useState<SelectionT>({
    persistant: true,
    date_start: stringToDate(queryParameters.get("ds")),
    date_end: stringToDate(queryParameters.get("de")),
    tags: (queryParameters.get("assos")?.trim()?.split(",") ||
      []) as AssosName[],
  });

  const onChange = (selection: SelectionT) => {
    setSelection(selection);
    props.onChange(selection);
    if (selection.date_start)
      queryParameters.append(
        "ds",
        dateToString(selection.date_start || new Date())
      );
    else queryParameters.delete("ds");
    if (selection.date_end)
      queryParameters.append(
        "de",
        dateToString(selection.date_end || new Date())
      );
    else queryParameters.delete("de");
    if (selection.tags && selection.tags.length !== 0)
      queryParameters.append("assos", selection.tags?.join(",") || "");
    else queryParameters.delete("assos");
    console.log("selection", selection);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.selection}>
          <CheckBox
            onChange={(persistant) => onChange({ ...selection, persistant })}
            defaultChecked={true}
          />
          <label htmlFor="persistant">Afficher les persistants</label>
        </div>
        <DateSelector
          className={styles.selection}
          label="Date de début"
          onChange={(date) =>
            onChange({
              ...selection,
              date_start: date,
            })
          }
        />
        <DateSelector
          className={styles.selection}
          label="Date de fin"
          onChange={(date) =>
            onChange({
              ...selection,
              date_end: date,
            })
          }
        />
        <MultSelector
          onChange={(tags) =>
            onChange({ ...selection, tags: tags as unknown as AssosName[] })
          } // HACK typescript, gotta watch that typing wizard video again
          className={styles.selection}
          selection={assosNames as unknown as string[]}
          label="Associations"
        />

        <MultSelector
          onChange={(facTypes) =>
            onChange({
              ...selection,
              facType: facTypes as unknown as FacType[],
            })
          } // HACK typescript
          className={styles.selection}
          selection={facTypes as unknown as string[]}
          label="Facultés"
        />
      </div>
    </ThemeProvider>
  );
}

// TODO
export function filterActus(selection: SelectionT, actus: ActuT[]): ActuT[] {
  return actus.filter((actu) => {
    if (!selection.persistant && actu.persistant) return false;

    if (selection.date_start && actu.date < selection.date_start) return false;
    if (selection.date_end && actu.date > selection.date_end) return false;

    let yeet = true;
    if (selection.tags.length > 0) {
      for (let asso of actu.assos) {
        if (selection.tags.includes(asso)) yeet = false;
      }
    } else yeet = false;

    if (yeet) return false;

    yeet = true;
    if (selection.facType.length > 0) {
      for (let facType of selection.facType) {
        if (actu.facType.includes(facType)) yeet = false;
      }
    } else yeet = false;

    return !yeet;
  });
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

// transform "DD-MM-YYYY" to Date
function stringToDate(date?: string): Date | undefined {
  if (!date || date.length !== 10) return undefined;

  const dateS = date.split("-");
  const dateI = dateS.map((s) => parseInt(s));
  if (dateI.length !== 3 || dateI.some((i) => isNaN(i))) return undefined;

  return new Date(dateI[0], dateI[1] - 1, dateI[2]);
}

function dateToString(date: Date): string {
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear().toString().padStart(4, "0")}`;
}
