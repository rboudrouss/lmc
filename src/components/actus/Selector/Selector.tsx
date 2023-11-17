import { useState } from "react";
import DateSelector from "../DateSelector/DateSelector";
import styles from "./Selector.module.css";

export interface SelectionT {
  tags?: string[];
  event?: boolean;
  persistant?: boolean;
  date_start?: Date;
  date_end?: Date;
}

export default function Selector(props: {
  onChange: (selection: SelectionT) => void;
}) {
  const [selection, setSelection] = useState<SelectionT>({});

  const onChange = (selection: SelectionT) => {
    setSelection(selection);
    props.onChange(selection);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selection}>
        <input
          type="checkbox"
          name="event"
          id="event"
          defaultValue="on"
          onChange={(e) =>
            onChange({
              ...selection,
              event: e.target.checked,
            })
          }
        />
        <label htmlFor="persistant">Event</label>
      </div>
      <div className={styles.selection}>
        <input
          type="checkbox"
          name="persistant"
          id="persistant"
          defaultValue="on"
          onChange={(e) =>
            onChange({
              ...selection,
              persistant: e.target.checked,
            })
          }
        />
        <label htmlFor="persistant">Persistant</label>
      </div>
      <DateSelector
        className={styles.selection}
        name="date_start"
        id="date_start"
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
        name="date_end"
        id="date_end"
        label="Date de fin"
        onChange={(date) =>
          onChange({
            ...selection,
            date_end: date,
          })
        }
      />
      <div className={styles.selection}>
        <input
          type="text"
          name="tags"
          id="tags"
          onChange={(e) =>
            onChange({
              ...selection,
              tags: e.target.value.trim().toLocaleLowerCase().split(" "),
            })
          }
        />
        <label htmlFor="tags">Associations</label>
      </div>
    </div>
  );
}
