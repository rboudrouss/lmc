import { Dropdown } from "../Dropdown/Dropdown";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./Page.module.css";
import type { Element_Drop } from "../../helpers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page(props: {
  data: Element_Drop;
  footer: { mail: string; links: { icon: string; link: string }[] };
  goBack: () => void;
  goTo: (e: Element_Drop) => void;
  goHome: () => void;
  showArrow?: boolean;
}) {
  let {
    data: { content, childs, title },
    goBack,
    goTo,
    goHome,
    showArrow,
  } = props;

  return (
    <main className={styles.wrapper}>
      <Header
        title={title}
        arrow={true}
        goBack={goBack}
        goHome={goHome}
        show={showArrow}
      />
      <div className={styles.contentWrapper}>
        <span className={styles.content}>
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
        </span>
        <div className={styles.dropdowns}>
          {childs?.map((child, i) => (
            <Dropdown {...child} key={i} goTo={goTo} />
          ))}
        </div>
      </div>
      <Footer {...props.footer} />
    </main>
  );
}
