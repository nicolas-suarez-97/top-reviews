import Layout from "../sections/layout/Layout";
import styles from "./article.module.scss";
import ProductCard from "../components/ProductCard";
import {getCollection} from "../utils/mongodb";

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
    let article = await getCollection('article', {id: params.article})

    return { props: { data: article[0] } }
}

export async function getStaticPaths() {

    let articles = await getCollection('article', null)

    const paths = articles.map(a => ({
        params: { article: a.id },
    }))

    return { paths, fallback: false }
}


export default Article