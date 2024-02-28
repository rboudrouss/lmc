import styles from "./Header.module.css";

import Bars from "@/icons/bars.svg";

export default function Header(props: { title: string; goBack?: () => void }) {
  const { title, goBack } = props;

  return (
    <header className={styles.wrapper}>
      <a href="/">
        <img src="/assets/logo/logo.png" alt="logo" className={styles.logo} />
      </a>

      <h1 className={styles.title}>{title}</h1>

      <img
        className={styles.bars}
        src={Bars.src}
        alt="menu"
        style={{ cursor: "pointer" }}
        onClick={() => goBack()}
      />
    </header>
  );
}
