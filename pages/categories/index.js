import Layout from "../../sections/layout/Layout";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import {getCollection} from "../../utils/mongodb";
import styles from "./styles.module.scss";
import Head from "next/head";
import React from "react";

const Categories = ({data}) => {
    return <>
        <Head>
            <title>TopReviews All Categories</title>
            <meta content={`TopReviews search for the best products in all categories 
            so you can easily compare and find the right one for you.`} name='description' />
        </Head>
        <Layout>
            <h1 className={styles.title}>All Categories</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                    {data.map(d => (
                        <CategoryComponent key={d.id} category={d} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps() {
    let categories = await getCollection('category', null)

    return { props: { data: categories } }
}

export default Categories