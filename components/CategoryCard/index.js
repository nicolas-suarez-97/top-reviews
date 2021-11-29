import styles from "./styles.module.scss";
import Link from "next/link";
import ImageCard from "../ImageCard";

const CategoryCard = ({category}) => {
    return (
        <div key={category.id} className={styles.main}>
            <Link href={`/categories/${category.id}`}  passHref>
                <a className={styles.category}>
                    <ImageCard
                        imageAlt={category.name}
                        image={category.imageUrl}
                        link={`/categories/${category.id}`}
                        size='extra-small'
                        className={styles.link}
                    />
                    <h3>{category.name}</h3>
                </a>
            </Link>
            <div className={styles.subcategories}>
                {category.subCategories.map((s) => (
                    <Link href={`/categories/${category.id}/${s.id}`} key={s.id}>
                        <a className={styles.subcategories__name}>{s.name}</a>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoryCard;