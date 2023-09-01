import { useContext, useState } from "react";
import { Element_Drop } from "../../helpers/types";

import styles from "./Dropdown.module.css";
import { AppContext } from "../../context";

export function Dropdown(
  props: Element_Drop
) {
  const { title, content, opened, childs, isPage } = props;
  const [open, setOpen] = useState(opened ? true : false);

  const appContext = useContext(AppContext);
  const updatePage = appContext.goTo;


  function handleClick():void {
    if (isPage && updatePage) {
      updatePage(props);
      return;
    }
    setOpen(!open);
  };

  let dropdowns =
    childs &&
    childs.map((child) => Dropdown(child)); // TODO set unique key value

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        <p className={styles.title}>{title}</p>
        <i
          className={`fa-solid fa-arrow-up-from-bracket ${styles.arrow}`}
          onClick={(e) => {
            e.stopPropagation();
            console.log("uwu owo", updatePage);
            updatePage(props);
          }}
        ></i>
      </button>

      <>{open && content}</>

      {open && dropdowns}
    </div>
  );
}