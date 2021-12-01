import Link from "next/link";
import * as categoryService from "../../api/categories"
import Layout from "../../../sections/layout/Layout";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import styles from "./index.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const Subcategory = ({data}) => {
    return <>
        <Layout>
            <h1>{data.name}</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                {data.articles.map(a => (
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
    const data = categoryService.getSubcategory(params.category, params.subcategory)

    return { props: { data } }
}

export async function getStaticPaths() {
    const categories = categoryService.getCategoryList()

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


