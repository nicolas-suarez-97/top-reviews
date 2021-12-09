import Layout from "../sections/layout/Layout";
import ImageCard from "../components/ImageCard";
import styles from "./home.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import CategoryComponent from "../components/CategoryComponent/CategoryComponent";
import {getCollection} from "../utils/mongodb";

export default function Home({categories, articles}) {

    return (
        <>
            <Layout>
                <h1 className={styles.title}>Top Products In All Categories</h1>
                <div>
                    <div className={styles.main}>
                        <ImageCard
                            size='large'
                            image={articles[0].imageUrl}
                            title={articles[0].title}
                            elevation={2}
                            link={`/${articles[0].id}`}
                            className={styles.image}
                        />
                        <div className={styles.secondary}>
                            <ImageCard
                                size='medium'
                                image={articles[1].imageUrl}
                                title={articles[1].title}
                                elevation={2}
                                link={`/${articles[1].id}`}
                                className={styles.image}
                            />
                            <ImageCard
                                size='medium'
                                image='https://picsum.photos/400/200'
                                title='Hola Mundo'
                                elevation={2}
                                link='/'
                                className={styles.image}
                            />
                        </div>
                    </div>
                    <div className={styles.others}>
                        <ImageCard
                            size='small'
                            image='https://picsum.photos/400/200'
                            title='Hola Mundo'
                            elevation={2}
                            link='/'
                            className={styles.image}
                        />
                        <ImageCard
                            size='small'
                            image='https://picsum.photos/400/200'
                            title='Hola Mundo'
                            elevation={2}
                            link='/'
                            className={styles.image}
                        />
                        <ImageCard
                            size='small'
                            image='https://picsum.photos/400/200'
                            title='Hola Mundo'
                            elevation={2}
                            link='/'
                            className={styles.image}
                        />
                        <ImageCard
                            size='small'
                            image='https://picsum.photos/400/200'
                            title='Hola Mundo'
                            elevation={2}
                            link='/'
                            className={styles.image}
                        />
                        <ImageCard
                            size='small'
                            image='https://picsum.photos/400/200'
                            title='Hola Mundo'
                            elevation={2}
                            link='/'
                            className={styles.image}
                        />
                    </div>
                </div>
                <div className={styles.categories}>
                    <h1>All Categories</h1>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 580: 2, 810: 3, 1050: 4}}
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

    return { props: { articles, categories } }
}
