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
                <meta content='TopReviews' property='site_name' />
                <meta content='TopReviews' property='og:site_name' />
                <meta content='article' property='type' />
                <meta content='article' property='og:type' />
                <meta content='' property='og:url' />
                <meta content='TopReviews is a project that seeks to group the best products of each category in one place.
                Best products, best offers.' property='og:description' />
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