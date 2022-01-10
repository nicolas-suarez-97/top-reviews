import Layout from "../../../sections/layout/Layout";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {getCollection} from "../../../utils/mongodb";
import styles from "./index.module.scss"
import BreadcrumbComponent from "../../../components/BreadcrumbComponent";
import Head from "next/head";
import React from "react";

const Subcategory = ({data, category, subCategory}) => {
    const title = subCategory[0].toUpperCase() + subCategory.slice(1).replace(/-/g, ' ')
    const categoryText = category[0].toUpperCase() + category.slice(1);
    const steps = ['Categories', categoryText, title];
    const stepIds = ['categories', `categories/${category}`, `categories/${category}/${subCategory}`];
    return <>
        <Head>
            <title>TopReviews {title}</title>
            <meta content={`TopReviews search for the best products in all categories 
            so you can easily compare and find the right one for you.`} name='description' />
        </Head>
        <Layout>
            <h1 className={styles.title}>{title}</h1>
            <BreadcrumbComponent steps={steps} stepIds={stepIds} />
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                {data.map(a => (
                    <CategoryCard
                        key={a.id}
                        imageUrl={a.imageUrl}
                        name={a.title}
                        link={`/${a.id}`}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps({params}) {
    let articles = await getCollection('article', {subCategoryId: params.subcategory})
    return { props: { data: articles, category: params.category, subCategory: params.subcategory } }
}

export async function getStaticPaths() {
    let categories = await getCollection('category', null)
    let paths = []
    categories.map(c => {
        paths = paths.concat(c.subCategories.map(s => ({
            params: {category: c.id, subcategory: s.id}
        })))
        return paths
    })

    return { paths, fallback: false }
}

export default Subcategory


