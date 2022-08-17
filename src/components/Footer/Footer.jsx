import styles from "./Footer.module.css"

let Footer = () => <footer className={styles.container}>
    <a href="mailto:lamatricecarree@gmail.com" className={styles.link}>lamatricecarree@gmail.com</a>
    <ul className={styles.social_list}>
        <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://discord.gg/7yNYMsQj5n" target="_blank" rel="noreferrer">
                <i className="fab fa-discord"></i>
            </a>
        </li>
        <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://www.youtube.com/channel/UCIDq2rOKER9TbY8YfPq8-KA" target="_blank" rel="noreferrer">
                <i className="fab fa-youtube"></i>
            </a>
        </li>
        <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://www.instagram.com/LaMatriceCarree/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
        </li>
        <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://www.facebook.com/LaMatriceCarree/" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook"></i>
            </a>
        </li>
        <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://twitter.com/LaMatriceCarree" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
            </a>
        </li>
    </ul>
</footer>

export default Footer;