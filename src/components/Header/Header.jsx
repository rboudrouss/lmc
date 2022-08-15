import styles from "./Header.module.css";

let Header = ({ text }) => {
    return <section>
        <div>
            <div className={styles.main}>
                <img src="/assets/logo_base/NoirLaMatriceCarree.png" alt="logo" className={styles.main_logo} />
            </div>
            <div className={styles.maintext_container}>
                <p className={styles.maintext}>
                    {text}
                </p>
            </div>
        </div>
    </section>;
}

export default Header;