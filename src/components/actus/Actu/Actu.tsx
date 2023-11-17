import styles from "./Actu.module.css";

import { assosToImg, dateToStringFromToday } from "@/helpers";

export default function Actu(props: {
  title: string;
  content?: string;
  date?: Date;
  img?: string;
  source?: string;
  assos: string[];
  link?: string;
  alwaysShow?: boolean; // by default, if date is passed, it is not shown
}) {
  if (!props.alwaysShow && props.date && props.date < new Date())
    return undefined;

  let { title, content, date, img, source, assos, link } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.date}>{dateToStringFromToday(date)}</h3>
        <div className={styles.header}>
          <div className={styles.assos}>
            {assos.map(
              (asso) =>
                assosToImg(asso) && (
                  <img
                    src={assosToImg(asso)}
                    alt={asso}
                    className={styles.asso}
                    key={asso}
                  />
                )
            )}
          </div>
          <a href={link}>
            <h3 className={styles.title}>{title}</h3>
          </a>
        </div>
        <div className={styles.body}>
          {content && (
            <div className={styles.textWrapper}>
              <p
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: content }} // FIXME find a better way
              ></p>
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
