import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./styles.module.scss";
import Head from "next/head";

const Layout = props => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                <meta name="robots" content="index"/>
                <meta name="robots" content="follow"/>
                <meta name="robots" content="all" />
                <meta charSet="utf-8"/>
                <meta name="dc.language" scheme="rfc1766" content="english" />
                <meta name="author" content="TopReviews" />
                <meta content='TopReviews' name='site_name' />
                <meta content='TopReviews' name='og:site_name' />
                <meta content='article' name='type' />
                <meta content='article' name='og:type' />
                <meta content='' name='og:url' />
                <meta content='TopReviews is a project that seeks to group the best products of each category in one place.
                Best products, best offers.' name='og:description' />
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