import Link from "next/link";
import * as categoryService from "../api/categories"
import Layout from "../../sections/layout/Layout";

const Categories = ({data}) => {
    return <>
        <Layout>
            <h1>Categories</h1>
            <ul>
                {data.map(d => (<li key={d.id} ><Link href={`/categories/${d.id}`}>{d.name}</Link></li>))}
            </ul>
        </Layout>
    </>
}

export async function getStaticProps() {
    const data = categoryService.getCategoryList()

    return { props: { data } }
}

export default Categories