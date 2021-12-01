import Link from "next/link";
import * as articleService from "./api/articles"
import Layout from "../sections/layout/Layout";
import styles from "./article.module.scss";
import ProductCard from "../components/ProductCard";

const Article = ({data}) => {

    return <>
        <Layout>
            <h1 className={styles.title}>{data.title}</h1>
            <div className={styles.container}>
                {data.products.map(p => (
                    <ProductCard
                        key={p.id}
                        product={p}
                    />
                ))}
            </div>
        </Layout>
    </>
}


export async function getStaticProps({params}) {
    const data = articleService.getArticleById(params.article)

    return { props: { data } }
}

export async function getStaticPaths() {
    const articles = articleService.getArticlesIds()

    const paths = articles.map(a => ({
        params: { article: a },
    }))

    return { paths, fallback: false }
}


export default Article