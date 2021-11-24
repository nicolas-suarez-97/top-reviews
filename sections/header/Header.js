import React from "react";
import Link from "next/link";
import styles from './styles.module.scss'

const Header = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.container__logo}><span>Top</span>Reviews</h2>
            <div className={styles.container__search_bar}>

                <input type="text"/>
            </div>
            <ul className={styles.container__options}>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/categories'>Categories</Link></li>
                <li>Discover</li>
            </ul>
        </div>
    )
}

export default Header;
