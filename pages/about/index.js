import React from "react";
import Layout from "../../sections/layout/Layout";
import Image from "next/image";
import reviews from "../../assets/Reviews.svg";
import styles from "./about.module.scss";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <Head>
                <title>TopReviews About Page</title>
                <meta content='TopReviews is a project that seeks to group the best products of each category in one place.
                Best products, best offers.' name='description' />
            </Head>
            <Layout>
                <div className={styles.container}>
                    <h1>About Us</h1>
                    <p className={styles.content}>
                        TopReviews is a project that seeks to group the best products of each category in one place.
                        We know there are so many products out there that it could be overwhelming to find out which one is the
                        best for your needs or how other customers have felt with their purchases.
                        The purpose is to help as many people as we can in the process of buying any product they are looking for
                        by selecting the best reviewed products in each category and displaying them as easy as possible.
                    </p>
                    <Image
                        src={reviews}
                        width={200}
                        height={200}
                        alt="Product Teardown Image"
                    />
                </div>
            </Layout>
        </>
    )
}

export default Index;