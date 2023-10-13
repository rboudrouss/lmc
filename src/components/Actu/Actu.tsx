import styles from "./Actu.module.css";

export default function Actu(props: {
  title: string;
  content?: string;
  date: Date;
  img?: string;
  source?: string;
  tags: string[];
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main_content}>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        {props.img && <img className={styles.img} src={props.img} alt={props.title} />}
      </div>
      <div className={styles.add_info}>
        <p>date {props.date.toDateString()}</p>
        {props.source && (
          <a href={props.source}>
            <p>Source / pour plus d'info</p>
          </a>
        )}
      </div>
    </div>
  );
}
