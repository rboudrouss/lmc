import styles from "./Header.module.css";

let Header = () => {
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    </p>
                </div>
            </div>
        </div>
    </section>;
}

export default Header;