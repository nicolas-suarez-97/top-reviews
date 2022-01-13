import Layout from "../sections/layout/Layout";
import ImageCard from "../components/ImageCard";
import styles from "./home.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";
import {getCollection} from "../utils/mongodb";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Home({categories, articles}) {

    return (
        <>
            <Head>
                <title>TopReviews</title>
                <meta content='TopReviews is a project that seeks to group the best products of each category in one place.
                Best products, best offers.' name='description' />
            </Head>
            <Layout>
                <h1 className={styles.title}>Top Products In All Categories</h1>
                <div>
                    <div className={styles.main}>
                        <div className={styles.primary}>
                            <Link href={`/${articles[0].id}`}>
                                <a>
                                    <ImageCard
                                        size='large-square'
                                        image={articles[0].imageUrl}
                                        imageAlt={articles[0].title}
                                        title={articles[0].title}
                                        elevation={2}
                                        link={`/${articles[0].id}`}
                                        className={styles.image}
                                        category={articles[0].category}
                                        categoryId={articles[0].categoryId}
                                        date={articles[0].modificationDate}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className={styles.secondary}>
                            {articles.map((a, index) => index > 0 && index < 5 ? (
                                <Link href={`/${a.id}`}  key={a.id} passHref>
                                    <a>
                                        <ImageCard
                                            size='small-square'
                                            image={a.imageUrl}
                                            imageAlt={a.title}
                                            title={a.title}
                                            elevation={2}
                                            link={`/${a.id}`}
                                            className={styles.image}
                                            category={a.category}
                                            categoryId={a.categoryId}
                                        />
                                    </a>
                                </Link>
                            ) : null)}
                        </div>
                    </div>
                </div>
                <h1>Articles</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 500: 2, 810: 3, 1050: 4}}
                >
                    <Masonry>
                        {articles.map((d, index) => index > 4 ? (
                            <CategoryCard
                                key={d._id}
                                name={d.title}
                                imageUrl={d.imageUrl}
                                link={`/${d.id}`}
                            />
                        ) : null)}
                    </Masonry>
                </ResponsiveMasonry>
                <div className={styles.categories}>
                    <h1>All Categories</h1>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 500: 2, 810: 3, 1050: 4}}
                    >
                        <Masonry>
                            {categories.map(d => (
                                <CategoryComponent key={d.id} category={d} />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({params}) {
    let articles = await getCollection('article',null)
    let categories = await getCollection('category',null)

    return { props: { articles, categories} }
}
