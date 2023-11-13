import styles from "./Header.module.css";

export default function Header(props: {
  title: string;
  goBack?: () => void;
  goHome?: () => void;
  arrow?: boolean;
}) {
  const { title, arrow, goBack, goHome } = props;

  return (
    <header className={styles.wrapper}>
      {arrow ? (
        <i
          className={`fa-solid fa-arrow-left ${styles.arrow}`}
          style={{ cursor: "pointer" }}
          onClick={() => goBack()}
        ></i>
      ) : (
        <i
          className={`fa-solid fa-bars ${styles.arrow}`}
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
