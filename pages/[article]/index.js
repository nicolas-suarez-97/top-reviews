import React, {useEffect} from "react";
import Layout from "../../sections/layout/Layout";
import styles from "./article.module.scss";
import ProductCard from "../../components/ProductCard";
import {getCollection} from "../../utils/mongodb";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import {months} from "../../constants/date";
import ContentTable from "../../components/ContentTable";
import RelatedArticles from "../../components/RelatedArticles";
import Head from "next/head";
import {metaFormatDate, parseDate} from "../../utils/utils";

const Index = ({data, related}) => {
    const title = `Top ${data.products.length} Best ${data.title}`;
    const date = `of ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
    const steps = ['Categories', data.category, data.subCategory, title];
    const stepIds = ['categories', `categories/${data.categoryId}`, `categories/${data.categoryId}/${data.subCategoryId}`, data.id];
    return <>
        <Head>
            <title>{title} {date}</title>
            <meta name='title' content={`${title} ${date}`} />
            <meta content={`TopReviews search for the best ${data.title} ${date} 
            so you can easily compare and find the right one ${data.title} for you.`} property='description' />
            <meta name="keywords" content={`${data.category}, ${data.subCategory}, ${data.title}, ${title} ${date}
                ${data.products.map(p => (` ${p.name}`))}
            `}/>
            <meta name="DateCreated" content={`${data.modificationDate}`} />
            <meta name="date" content={`${parseDate(data.modificationDate)}`} />
            <meta name="search_date" content={`${metaFormatDate(data.modificationDate)}`} />
        </Head>
        <Layout>
            <h1 className={styles.title} id="title">{title} {date}</h1>
            <BreadcrumbComponent steps={steps} stepIds={stepIds}/>
            <div className={styles.container}>
                {data.products.map(p => (
                    <ProductCard
                        key={p.name}
                        product={p}
                    />
                ))}
            </div>
            <RelatedArticles articles={related} />
            <BreadcrumbComponent steps={steps} stepIds={stepIds}/>
        </Layout>
    </>
}


export async function getStaticProps({params}) {
    let article = await getCollection('article', {id: params.article})
    let related = await getCollection('article', {subCategoryId: article[0].subCategoryId})

    return { props: { data: article[0], related} }
}

export async function getStaticPaths() {

    let articles = await getCollection('article', null)

    const paths = articles.map(a => ({
        params: { article: a.id },
    }))

    return { paths, fallback: false }
}


export default Index