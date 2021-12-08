import Link from "next/link";
import * as categoryService from "../../api/categories"
import Layout from "../../../sections/layout/Layout";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import styles from "./index.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {getCategoryList} from "../../../services/categoryService";
import {getEnvUrl} from "../../../utils/utils";

const Subcategory = ({data, category, subCategory}) => {
    let title = subCategory[0].toUpperCase() + subCategory.slice(1).replaceAll('-', ' ')
    return <>
        <Layout>
            <h1>{title}</h1>
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
    let response = await fetch(`${getEnvUrl()}/api/article?subCategoryId=${params.subcategory}`);
    let data = await response.json();
    return { props: { data: data['message'], category: params.category, subCategory: params.subcategory } }
}

export async function getStaticPaths() {
    const categories = await getCategoryList();
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


