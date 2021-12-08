import * as categoryService from "../../api/categories"
import Layout from "../../../sections/layout/Layout";
import styles from "./index.module.scss";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {getEnvUrl} from "../../../utils/utils";
import {getCategoryList} from "../../../services/categoryService"

const Category = ({data, category}) => {
    let title = category[0].toUpperCase() + category.slice(1).replaceAll('-', ' ')
    return <>
        <Layout>
            <h1>{title}</h1>
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
    let response = await fetch(`${getEnvUrl()}/api/subcategory?categoryId=${params.category}`);

    let data = await response.json();
    return { props: { data: data['message'], category: params.category } }
}

export async function getStaticPaths() {
    const categories = await getCategoryList();
    const paths = categories.map(c => ({
        params: { category: c.id },
    }))

    return { paths, fallback: false }
}

export default Category