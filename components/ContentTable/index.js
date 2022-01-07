import React from "react";
import styles from "./contentTable.module.scss";

const ContentTable = ({className}) => {
    return (
        <section className={`${styles.container} ${className}`} id="nav">
            <ul className={styles.container__list}>
                <li><a href="#title">Top Picks</a></li>
                <li>Related Articles</li>
                <li>Top Picks</li>
                <li>Top Picks</li>
            </ul>
        </section>
    );
}

export default ContentTable;