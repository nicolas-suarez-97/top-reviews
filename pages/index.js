import Layout from "../sections/layout/Layout";
import ImageCard from "../components/ImageCard";
import styles from "./home.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";
import {getCollection} from "../utils/mongodb";
import CategoryCard from "../components/CategoryCard/CategoryCard";

export default function Home({categories, articles}) {

    return (
        <>
            <Layout>
                <h1 className={styles.title}>Top Products In All Categories</h1>
                <div>
                    <div className={styles.main}>
                        <div className={styles.primary}>
                            <ImageCard
                                size='large-square'
                                image={articles[0].imageUrl}
                                title={articles[0].title}
                                elevation={2}
                                link={`/${articles[0].id}`}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.secondary}>
                            <ImageCard
                                size='small-square'
                                image={articles[1].imageUrl}
                                title={articles[1].title}
                                elevation={2}
                                link={`/${articles[1].id}`}
                                className={styles.image}
                            />
                            <ImageCard
                                size='small-square'
                                image={articles[2].imageUrl}
                                title={articles[2].title}
                                elevation={2}
                                link={`/${articles[2].id}`}
                                className={styles.image}
                            />
                            <ImageCard
                                size='small-square'
                                image={articles[3].imageUrl}
                                title={articles[3].title}
                                elevation={2}
                                link={`/${articles[3].id}`}
                                className={styles.image}
                            />
                            <ImageCard
                                size='small-square'
                                image={articles[4].imageUrl}
                                title={articles[4].title}
                                elevation={2}
                                link={`/${articles[4].id}`}
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
                <h1>Articles</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 500: 2, 810: 3, 1050: 4}}
                >
                    <Masonry>
                        {articles.map((d, index) => index > 4 ? (
                            <CategoryCard
                                key={d._id}
                                name={d.title}
                                imageUrl={d.imageUrl}
                                link={`/${d.id}`}
                            />
                        ) : null)}
                    </Masonry>
                </ResponsiveMasonry>
                <div className={styles.categories}>
                    <h1>All Categories</h1>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 500: 2, 810: 3, 1050: 4}}
                    >
                        <Masonry>
                            {categories.map(d => (
                                <CategoryComponent key={d.id} category={d} />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({params}) {
    let articles = await getCollection('article',null)
    let categories = await getCollection('category',null)

    return { props: { articles, categories} }
}
