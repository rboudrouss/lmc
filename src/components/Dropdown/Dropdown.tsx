import { useEffect, useState } from "react";
import type { Element_Drop } from "../../helpers/types";

import styles from "./Dropdown.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Dropdown(
  props: Element_Drop & {
    goTo: (e: Element_Drop) => void;
  }
) {
  const { title, content, opened, childs, isPage, goTo } = props;
  const [open, setOpen] = useState(opened || false);

  if (opened) console.log("opened", title);

  const updatePage = goTo;

  function handleClick(e:any): void {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);

    if (isPage) {
      updatePage(props);
    }
  }

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        <p className={styles.title}>{title}</p>
        <i
          className={`fa-solid fa-arrow-up-from-bracket ${styles.arrow}`}
          onClick={(e) => {
            e.stopPropagation();
            updatePage(props);
          }}
        >
          up
        </i>
      </button>

      {open && content && (
        <div className={styles.content}>
          {typeof content === "string" ? (
            <ReactMarkdown
              children={content}
              className={styles.md_container}
              remarkPlugins={[remarkGfm]}
              linkTarget="_blank"
            />
          ) : (
            content
          )}
        </div>
      )}

      {open &&
        childs?.map((child, i) => <Dropdown {...child} key={i} goTo={goTo} />)}
    </div>
  );
}
