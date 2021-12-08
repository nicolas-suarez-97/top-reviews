import * as categoryService from "../api/categories"
import Layout from "../../sections/layout/Layout";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import {getEnvUrl} from "../../utils/utils";

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
    let response = await fetch(`${getEnvUrl()}/api/category`);

    let data = await response.json();

    return { props: { data: data['message'] } }
}

export default Categories