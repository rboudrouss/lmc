import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header(props: {
  title: string;
  goBack?: () => void;
  goHome?: () => void;
  arrow?: boolean;
  show?: boolean;
}) {
  const { title, arrow, goBack, goHome, show } = props;

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    setShowArrow(show);
  }, [show]);

  return (
    <header className={styles.wrapper}>
      {arrow ? (
        <i
          className={`fa-solid fa-arrow-left fa-3x ${styles.arrow} `}
          style={showArrow ? { cursor: "pointer", opacity: 1 } : { opacity: 0 }}
          onClick={() => goBack()}
        ></i>
      ) : (
        <i
          className={`fa-solid fa-bars fa-3x ${styles.arrow}`} //FIXME très moche
          style={{ cursor: "pointer" }}
          onClick={() => goBack()}
        ></i>
      )}
      <h1 className={styles.title}>{title}</h1>
      {goHome ? (
        <img
          src="/assets/logo/logo.png"
          alt="logo"
          className={styles.logo}
          onClick={() => {
            goHome();
          }}
        />
      ) : (
        <a href="/">
          <img src="/assets/logo/logo.png" alt="logo" className={styles.logo} />
        </a>
      )}
    </header>
  );
}
