import styles from "./ActuPage.module.css";
import type { ActuT } from "@/helpers";
import { useState } from "react";
import Actu from "../Actu/Actu";
import Selector, { filterActus } from "../Selector/Selector";
import Header from "../Header/Header";
import FakeSelector from "../FakeSelector/FakeSelector";

export default function ActuPage(props: {
  actus?: ActuT[];
  alwaysShow?: boolean;
  selected?: "infos" | "actus";
}) {
  const [actus, setActus] = useState<ActuT[]>(props.actus ?? []);
  const [selector, setSelector] = useState<boolean>(false);

  return (
    <>
      <Header
        title="Actualités Universitaires"
        goBack={() => {
          setSelector(!selector);
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.actus}>
          <FakeSelector selected={props.selected} />
          {actus.map((actu, i) => (
            <Actu {...actu} key={i} alwaysShow={props.alwaysShow} />
          ))}
        </div>
        <div
          className={styles.selector}
          style={selector ? {} : { display: "none" }}
        >
          <Selector
            onChange={(selection) => {
              setActus(filterActus(selection, props.actus));
            }}
          />
        </div>
      </div>
    </>
  );
}
