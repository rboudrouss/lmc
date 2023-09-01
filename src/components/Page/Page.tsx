import { useContext } from "react";
import { Dropdown } from "../Dropdown/Dropdown";
import { AppContext } from "../../context";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./Page.module.css";

export default function Page(props: {
  footer: { mail: string; links: { icon: string; link: string }[] };
}) {
  const context = useContext(AppContext);
  let { content, childs } = context.selected;

  let dropdowns = childs && childs.map((child) => Dropdown(child)); // TODO set unique key value

  return (
    <main className={styles.wrapper}>
      <Header />
      <div className={styles.contentWrapper}>
        <p>{content}</p>
        <div>{dropdowns}</div>
      </div>
      <Footer {...props.footer} />
    </main>
  );
}