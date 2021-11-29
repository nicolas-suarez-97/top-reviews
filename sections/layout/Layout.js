import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./styles.module.scss";
import Head from "next/head";

const Layout = props => {
    return (
        <>
            <Head>
                <title>TopReviews</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <Header />
            <main className={styles.container}>
                {props.children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;