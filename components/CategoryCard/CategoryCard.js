import styles from "./category-card.module.scss";
import ImageCard from "../ImageCard";
import Link from "next/link";

const CategoryCard = ({link, name, imageUrl}) => {
    return imageUrl !== "" ? (
        <Link href={link} passHref>
            <div className={styles.main}>
                <ImageCard
                    image={imageUrl}
                    link={link}
                    imageAlt={name}
                    size='extra-small'
                />
                <p>{name}</p>
            </div>
        </Link>
    ) : null;
}

export default CategoryCard;