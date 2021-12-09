import Layout from "../../sections/layout/Layout";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import {getCollection} from "../../utils/mongodb";

const Categories = ({data}) => {
    return <>
        <Layout>
            <h1>All Categories</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                    {data.map(d => (
                        <CategoryComponent key={d.id} category={d} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps() {
    let categories = await getCollection('category', null)

    return { props: { data: categories } }
}

export default Categories