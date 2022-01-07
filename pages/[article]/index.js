import Layout from "../../sections/layout/Layout";
import styles from "./article.module.scss";
import ProductCard from "../../components/ProductCard";
import {getCollection} from "../../utils/mongodb";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import {months} from "../../lib/constants";

const Index = ({data}) => {
    const title = `Top ${data.products.length} Best ${data.title}`;
    const date = `of ${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
    const steps = ['Categories', data.category, data.subCategory, title];
    const stepIds = ['categories', `categories/${data.categoryId}`, `categories/${data.categoryId}/${data.subCategoryId}`, data.id];
    console.log(data);
    return <>
        <Layout>
            <h1 className={styles.title}>{title} {date}</h1>
            <BreadcrumbComponent steps={steps} stepIds={stepIds}/>
            <div className={styles.container}>
                {data.products.map(p => (
                    <ProductCard
                        key={p.name}
                        product={p}
                    />
                ))}
            </div>
            <BreadcrumbComponent steps={steps} stepIds={stepIds}/>
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


export default Index