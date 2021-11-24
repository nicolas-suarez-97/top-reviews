import Link from "next/link";
import Layout from "../sections/layout/Layout";
import ImageCard from "../components/ImageCard";
import styles from "./home.module.scss";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const product = {
        name: 'Mothers 08408 California Gold Scratch Remover - 8 oz.',
        store: 'Mothers',
        storeUrl: '',
        price: 0,
        link: 'https://www.amazon.com',
        imageUrl: 'https://m.media-amazon.com/images/I/416BAwcCpRL._SL500_.jpg',
        imageAlt: 'Mothers 08408 California Gold Scratch Remover - 8 oz.',
        rating: 5,
        number: 1,
    }

    return (
        <>
            <Layout>
                <div className={styles.test}>
                    {/*<ImageCard*/}
                    {/*    size='large'*/}
                    {/*    image='https://picsum.photos/400/200'*/}
                    {/*    title='Hola Mundo'*/}
                    {/*    elevation={2}*/}
                    {/*    link='/'*/}
                    {/*/>*/}
                    <ProductCard
                        number={1}
                        link='/'
                        image='https://picsum.photos/400/200'
                        product={product}
                    />
                </div>
            </Layout>
        </>
    )
}
