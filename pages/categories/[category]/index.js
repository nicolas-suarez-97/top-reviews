import Layout from "../../../sections/layout/Layout";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {getCollection} from "../../../utils/mongodb";
import styles from "./index.module.scss";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent";

const Category = ({data, category}) => {
    let title = category[0].toUpperCase() + category.slice(1).replace(/-/g, ' ')
    const steps = ['Categories', title];
    const stepIds = ['categories', `categories/${category}`];
    return <>
        <Layout>
            <BreadcrumbComponent steps={steps} stepIds={stepIds} />
            <h1 className={styles.title}>{title}</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                {data.map(d => (
                    <CategoryCard
                        key={d.id}
                        name={d.name}
                        imageUrl={d.imageUrl}
                        link={`/categories/${category}/${d.id}`}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps({params}) {
    let subCategory = await getCollection('subcategory', {categoryId: params.category})
    return { props: { data: subCategory, category: params.category } }
}

export async function getStaticPaths() {
    let categories = await getCollection('category', null)
    const paths = categories.map(c => ({
        params: { category: c.id },
    }))

    return { paths, fallback: false }
}

export default Category