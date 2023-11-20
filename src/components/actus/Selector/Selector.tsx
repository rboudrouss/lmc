import { useState } from "react";
import DateSelector from "./DateSelector/DateSelector";
import AssosSelector from "./AssosSelector/AssosSelector";
import styles from "./Selector.module.css";
import type { ActuT, AssosName } from "@/helpers";
import CheckBox from "./CheckBox/CheckBox";

export interface SelectionT {
  tags?: AssosName[];
  persistant?: boolean;
  date_start?: Date;
  date_end?: Date;
}

export default function Selector(props: {
  onChange: (selection: SelectionT) => void;
}) {
  const [selection, setSelection] = useState<SelectionT>({
    persistant: true,
  });

  const onChange = (selection: SelectionT) => {
    setSelection(selection);
    props.onChange(selection);
    console.log("selection", selection);
  };

  return (
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
      <AssosSelector onChange={(tags) => onChange({ ...selection, tags })} />
    </div>
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

    return !yeet;
  });
}
