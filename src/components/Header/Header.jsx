import styles from "./Header.module.css";

let Header = ({text}) => {
    return <section>
        <div>
            <div>
                <img src="/linktree.svg" alt="logo" className={styles.linktree_logo} />
            </div>
            <div>
                <div className={styles.main}>
                    <img src="/ico.png" alt="logo" className={styles.main_logo} />
                </div>
                <div className={styles.maintext_container}>
                    <p className={styles.maintext}>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    </section>;
}

export default Header;