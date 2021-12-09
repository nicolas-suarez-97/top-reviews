import Layout from "../../../sections/layout/Layout";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {getCollection} from "../../../utils/mongodb";

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
    let articles = await getCollection('article', {subCategoryId: params.subcategory})
    return { props: { data: articles, category: params.category, subCategory: params.subcategory } }
}

export async function getStaticPaths() {
    let categories = await getCollection('category', null)
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


