import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import {getElevation} from "../../utils/utils";

const ImageCard = ({size, image, title, elevation, link, imageAlt, className}) => {
    const cardSize = getImageCardSize(size)

    let cardElevation = getElevation(elevation)
    const myLoader = ({ src, width, quality }) => {
        return `${image}?w=${width}&q=${quality || 75}`
    }

    return image !== null && image !== "" ? (
        <Link href={link}>
            <a className={`${styles.card} ${cardSize} ${cardElevation} ${className}`}>
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
                            <h1 className={styles.card__title}>{title}</h1>
                        </div>
                    ) : null
                }
            </a>
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