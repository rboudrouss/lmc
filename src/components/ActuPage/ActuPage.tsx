import styles from "./ActuPage.module.css";
import type { ActuT } from "../../helpers";
import { useState } from "react";
import Actu from "../Actu/Actu";
import Selector, { type SelectionT } from "../Selector/Selector";

export default function ActuPage(props: { actus?: ActuT[] }) {
  const [actus, setActus] = useState<ActuT[]>(props.actus ?? []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selector}>
        <Selector
          onChange={(selection) => {
            setActus(filter(selection, props.actus));
          }}
        />
      </div>
      <div className={styles.actus}>
        {actus.map((actu) => (
          <Actu {...actu} />
        ))}
      </div>
    </div>
  );
}

// TODO
function filter(selection: SelectionT, actus: ActuT[]): ActuT[] {
  return actus.filter((actu) => {
    if (selection.persistant && !actu.persistant) return false;
    if (selection.date_start && actu.date < selection.date_start) return false;
    if (selection.date_end && actu.date > selection.date_end) return false;
    if (selection.tags) {
      for (let tag of selection.tags) {
        if (!actu.assos.includes(tag)) return false;
      }
    }
    return true;
  })
}
