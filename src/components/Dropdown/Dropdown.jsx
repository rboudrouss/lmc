import styles from "./Dropdown.module.css";
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

let Dropdown = ({ title, text, opened, children }) => {
    const [open, setOpen] = useState(opened ? true : false);

    let handleClick = () => {
        setOpen(!open);
    }

    //let texts = text && text.split("\b").map(text2 => (<p className={styles.text}>{text2}</p>))

    let dropdowns = children && children.map(child => Dropdown(child)); // TODO set unique key value

    return <div className={styles.container}>
        <button className={styles.button} onClick={handleClick}>
            <p className={styles.title}>
                {title}
            </p>
        </button>
        {open && text && (<ReactMarkdown
            children={text}
            className={styles.md_container}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
        />)}

        {open && dropdowns}
    </div>;

}

export default Dropdown;