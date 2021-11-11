import { useRouter } from 'next/router'
import Link from "next/link";
import * as categoryService from "../../api/categories"

const Subcategory = ({data}) => {
    const {category} = useRouter().query;
    return <>
        <h1>{category}</h1>
        <h3>{data.name}</h3>
        {data.articles.map(a => (<Link key={a.id} href={`/${a.id}`}>{a.title}</Link>))}
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
        paths = paths.concat(c.subCategoriesId.map(s => ({
            params: {category: c.id, subcategory: s}
        })))
        return {params: {category: c.id, subcategory: 'test'}}
    })

    return { paths, fallback: false }
}

export default Subcategory


