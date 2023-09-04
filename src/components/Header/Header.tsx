import styles from "./Header.module.css";

export default function Header(props: {
  title: string;
  goBack: () => void;
  goHome: () => void;
}) {
  const { title, goBack, goHome } = props;

  return (
    <header className={styles.wrapper}>
      <i
        className={`fa-solid fa-arrow-left ${styles.arrow}`}
        onClick={() => goBack()}
      >
        back
      </i>
      <h1 className={styles.title}>{title}</h1>
      <img
        src="/assets/logo/logo.png"
        alt="logo"
        className={styles.logo}
        onClick={() => {
          goHome();
        }}
      />
    </header>
  );
}
