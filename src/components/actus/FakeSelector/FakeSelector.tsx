import styles from "./FakeSelector.module.css";

const links = {
  infos: "/actus/infos",
  actus: "/actus",
};

export default function FakeSelector(props: { selected: "infos" | "actus" }) {
  const { selected } = props;
  return (
    <div className={styles.actus_nav}>
      <a
        href={links.infos}
        className={selected === "infos" ? styles.selected : styles.unselected}
      >
        Infos
      </a>
      <a
        href={links.actus}
        className={selected === "actus" ? styles.selected : styles.unselected}
      >
        Actus
      </a>
    </div>
  );
}
