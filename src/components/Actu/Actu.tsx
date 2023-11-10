import styles from "./Actu.module.css";

import { assosToImg } from "../../helpers";

export default function Actu(props: {
  title: string;
  content?: any;
  date?: Date;
  img?: string;
  source?: string;
  assos: string[];
}) {
  let { title, content, date, img, source, assos } = props;
  content = <content />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.date}>{date?.toDateString()}</h3>
        <div className={styles.header}>
          <div className={styles.assos}>
            {assos.map((asso) => (
              assosToImg(assos) && <img
                src={assosToImg(asso)}
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
              <p className={styles.text}>{<content />}</p>
            </div>
          )}
          {img && <img src={img} alt="" className={styles.img} />}
          {source && (
            <a href={source} className={styles.source}>
              Source / pour plus d'info
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
