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
  let goHome = navig ? props.goHome : () => {};


  return (
    <header className={styles.wrapper}>
      {navig ? (
        <i
          className={`fa-solid fa-arrow-left ${styles.arrow}`}
          onClick={() => goBack()}
        >
          back
        </i>
      ) : (
        <div></div>
      )}
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
