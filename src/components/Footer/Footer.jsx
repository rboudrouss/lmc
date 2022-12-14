import styles from "./Footer.module.css"

let Footer = ({ mail, links }) => {

    let iconLink = ({ icon, link, i }) => (<li className={styles.social_list__item} key={i}>
        <a className={styles.social_list__link} href={link} target="_blank" rel="noreferrer">
            <i className={"fab fa-" + icon}></i>
        </a>
    </li>)


    let all_icons = links && links.map(child => iconLink(child));

    return <footer className={styles.container}>
        <a href={"mailto:" + mail} className={styles.link}>{mail}</a>
        <ul className={styles.social_list}>
            {all_icons}
        </ul>
    </footer>
}

export default Footer;