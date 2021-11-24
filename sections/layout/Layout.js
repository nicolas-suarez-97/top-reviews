import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./styles.module.scss";

const Layout = props => {
    return (
        <>
            <Header />
            <main className={styles.container}>
                {props.children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;