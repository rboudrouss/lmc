import styles from "./Header.module.css";

type propsT = {
  title: string;
} & (
  | {
      navig: true;
      goBack: () => void;
      goHome: () => void;
    }
  | {
      navig?: false;
    }
);

export default function Header(props: propsT) {
  const { title, navig } = props;
  let goBack = navig ? props.goBack : () => {};
  let goHome = navig ? props.goHome : undefined;

  return (
    <header className={styles.wrapper}>
      {navig ? (
        <i
          className={`fa-solid fa-arrow-left ${styles.arrow}`}
          style={{ cursor: "pointer" }}
          onClick={() => goBack()}
        ></i>
      ) : (
        <div className={styles.arrow}></div>
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
