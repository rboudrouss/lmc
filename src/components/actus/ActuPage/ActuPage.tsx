import styles from "./ActuPage.module.css";
import type { ActuT } from "@/helpers";
import { useState } from "react";
import Actu from "../Actu/Actu";
import Selector, { type SelectionT } from "../Selector/Selector";
import Header from "../Header/Header";

export default function ActuPage(props: {
  actus?: ActuT[];
  alwaysShow?: boolean;
}) {
  const [actus, setActus] = useState<ActuT[]>(props.actus ?? []);
  const [selector, setSelector] = useState<boolean>(false);

  return (
    <>
      <Header
        title="Actualités Universitaires"
        goHome={() => {
          window.location.href = "/";
        }}
        goBack={() => {
          setSelector(!selector);
        }}
      />
      <div className={styles.wrapper}>
        <div
          className={styles.selector}
          style={selector ? {} : { display: "none" }}
        >
          <Selector
            onChange={(selection) => {
              setActus(filter(selection, props.actus));
            }}
          />
        </div>
        <div className={styles.actus}>
          {actus.map((actu) => (
            <Actu {...actu} alwaysShow={props.alwaysShow} />
          ))}
        </div>
      </div>
    </>
  );
}

// TODO
function filter(selection: SelectionT, actus: ActuT[]): ActuT[] {
  return actus.filter((actu) => {
    if (!(selection.event && selection.persistant)) {
      if (selection.event && actu.persistant) return false;
      if (selection.persistant && !actu.persistant) return false;
    }

    if (selection.date_start && actu.date < selection.date_start) return false;
    if (selection.date_end && actu.date > selection.date_end) return false;
    if (selection.tags) {
      for (let tag of selection.tags) {
        console.log("tag", tag, actu.assos);
        if (!actu.assos.includes(tag)) return false;
      }
    }
    return true;
  });
}
