import Link from "next/link";
import * as articleService from "./api/articles"

const Article = ({data}) => {

    return <>
        <h1>{data.title}</h1>
        <ul>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/categories'>Categories</Link></li>
        </ul>
        {data.products.map(p => (<p key={p.name}>{p.name}</p>))}
    </>
}


export async function getStaticProps({params}) {
    const data = articleService.getArticleById(params.article)

    return { props: { data } }
}

export async function getStaticPaths() {
    const articles = articleService.getArticles()

    const paths = articles.map(a => ({
        params: { article: a },
    }))

    return { paths, fallback: false }
}


export default Article