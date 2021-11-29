import * as categoryService from "../api/categories"
import Layout from "../../sections/layout/Layout";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryCard from "../../components/CategoryCard";


const Categories = ({data}) => {
    console.log(data);
    return <>
        <Layout>
            <h1>All Categories</h1>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
            >
                <Masonry>
                    {data.map(d => (
                        <CategoryCard key={d.id} category={d} />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </Layout>
    </>
}

export async function getStaticProps() {
    const data = categoryService.getCategoryList()

    return { props: { data } }
}

export default Categories