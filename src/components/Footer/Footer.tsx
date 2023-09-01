import styles from "./Footer.module.css";

export default function Footer(props: {
  mail: string;
  links: { icon: string; link: string }[];
}) {
  const { mail, links } = props;

  let iconLink = ({
    icon,
    link,
    i,
  }: {
    icon: string;
    link: string;
    i: number;
  }) => (
    <li className={styles.social_list__item} key={i}>
      <a
        className={styles.social_list__link}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <i className={"fab fa-" + icon}></i>
      </a>
    </li>
  );

  let all_icons = links && links.map((child, i) => iconLink({ ...child, i }));

  return (
    <footer className={styles.container}>
      <a href={"mailto:" + mail} className={styles.link}>
        {mail}
      </a>
      <ul className={styles.social_list}>{all_icons}</ul>
    </footer>
  );
}
