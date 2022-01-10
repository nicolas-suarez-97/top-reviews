import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import {getElevation, parseDate} from "../../utils/utils";

const ImageCard = ({size, image, title, elevation, link, imageAlt, category, categoryId, date, className}) => {
    const cardSize = getImageCardSize(size)

    let cardElevation = getElevation(elevation)
    const myLoader = () => {
        return `${image}?w=&q=${75}`
    }

    return image !== null && image !== "" ? (
        <Link href={link} passHref>
            <div className={`${styles.card} ${cardSize} ${cardElevation} ${className}`}>
                <Image
                    className={`${styles.card__image}`}
                    src={image}
                    alt={imageAlt}
                    layout="fill"
                    loader={myLoader}
                />
                {
                    title ? (
                        <div className={styles.card__shadow}>
                            <div className={styles.card__info}>
                                <Link href={`/categories/${categoryId}`} passHref>
                                    <div className={styles.card__category}>{category}</div>
                                </Link>
                                <p>{parseDate(date)}</p>
                            </div>
                            <h1 className={styles.card__title}>{title}</h1>
                        </div>
                    ) : null
                }
            </div>
        </Link>
    ) : null
};

const getImageCardSize = (size) => {
    switch (size) {
        case 'large':
            return styles.large;
        case 'medium':
            return styles.medium;
        case 'small':
            return styles.small;
        case 'large-square':
            return styles.largeSquare;
        case 'medium-square':
            return styles.mediumSquare;
        case 'small-square':
            return styles.smallSquare;
        case 'extra-small':
            return styles.extraSmall;
        default:
            return styles.small
    }
}

export default ImageCard;