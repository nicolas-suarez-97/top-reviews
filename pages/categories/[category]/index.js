import Link from "next/link";
import * as categoryService from "../../api/categories"

const Category = ({data}) => {
    return <>
        <h1>{data.name}</h1>
        <ul>
            {data.subcategories.map(d => (<li key={d.id}><Link href={`/categories/${data.id}/${d.id}`}>{d.name}</Link></li>))}
        </ul>
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