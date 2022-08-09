import styles from "./Dropdown.module.css";
import React, { useState } from 'react';

let Dropdown = ({ title, text, opened, children }) => {
    const [open, setOpen] = useState(opened ?? false);

    let handleClick = () => {
        setOpen(!open);
    }

    let dropdowns = children && children.map(child => Dropdown(child)); // TODO set unique key value

    return <div className={styles.container}>
        <button className={styles.button} onClick={handleClick}>
            <p className={styles.title}>
                {title}
            </p>
        </button>
        {open && (<p className={styles.text}> {text}</p>)}
        {open && dropdowns}
    </div>;

}

export default Dropdown;