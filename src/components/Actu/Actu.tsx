import styles from "./Actu.module.css";

export default function Actu(props: {
  title: string;
  content?: string;
  date: Date;
  img?: string;
  source?: string;
  assos: string[];
}) {
  const { title, content, date, img, source, assos } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.date}>{date.toDateString()}</h3>
        <div className={styles.header}>
          <div className={styles.assos}>
            {assos.map((asso) => (
              <img
                src={imgFromTag(asso)}
                alt={asso}
                className={styles.asso}
                key={asso}
              />
            ))}
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.body}>
          {content && (
            <div className={styles.textWrapper}>
              <p className={styles.text}>{content}</p>
            </div>
          )}
          {img && <img src={img} alt="" className={styles.img} />}
          {source && <a href={source} className={styles.source}>Source / pour plus d'info</a>}
        </div>
      </div>
    </div>
  );
}

function imgFromTag(asso: string) {
  return "/assets/assos/alias.svg";
}
