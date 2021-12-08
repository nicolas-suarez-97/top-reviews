import Link from "next/link";
import * as articleService from "./api/articles"
import Layout from "../sections/layout/Layout";
import styles from "./article.module.scss";
import ProductCard from "../components/ProductCard";
import {getArticleList} from "../services/articleService";
import {getEnvUrl} from "../utils/utils";

const Article = ({data}) => {

    return <>
        <Layout>
            <h1 className={styles.title}>Top {data.title}</h1>
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
    let response = await fetch(`${getEnvUrl()}/api/article?id=${params.article}`);

    let data = await response.json();
    console.log(data)

    return { props: { data: data['message'][0] } }
}

export async function getStaticPaths() {

    const articles = await getArticleList()
    const paths = articles.map(a => ({
        params: { article: a.id },
    }))

    return { paths, fallback: false }
}


export default Article