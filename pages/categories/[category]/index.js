import * as categoryService from "../../api/categories"
import Layout from "../../../sections/layout/Layout";
import styles from "./index.module.scss";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

const Category = ({data}) => {
    return <>
        <Layout>
            <h1>{data.name}</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                {data.subcategories.map(d => (
                    <CategoryCard
                        key={d.id}
                        name={d.name}
                        imageUrl={d.imageUrl}
                        link={`/categories/${data.id}/${d.id}`}
                    />
                ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps({params}) {
    const data = categoryService.getCategory(params.category)

    return { props: { data } }
}

export async function getStaticPaths() {
    const categories = categoryService.getCategoryList()

    const paths = categories.map(c => ({
        params: { category: c.id },
    }))

    return { paths, fallback: false }
}

export default Category