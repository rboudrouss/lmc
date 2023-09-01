import { useContext } from "react";
import styles from "./Header.module.css";
import { AppContext } from "../../context";

export default function Header() {
  const context = useContext(AppContext);
  let { title } = context.selected;

  return (
    <header className={styles.wrapper}>
      <i
        className={`fa-solid fa-arrow-left ${styles.arrow}`}
        onClick={() => context.goBack()}
      />
      <h1 className={styles.title}>{title}</h1>
      <img
        src="/assets/logo/logo.png"
        alt="logo"
        className={styles.logo}
        onClick={() => {
          console.log("uwu");
          console.log(context)
          context.goHome();
        }}
      />
    </header>
  );
}