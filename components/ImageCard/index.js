import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import {getElevation} from "../../utils/utils";

const ImageCard = ({size, image, title, elevation, link, imageAlt}) => {
    const cardSize = getImageCardSize(size)

    let cardElevation = getElevation(elevation)

    return image !== null ? (
        <Link href={link}>
            <a className={`${styles.card} ${cardSize} ${cardElevation}`}>
                <Image className={`${styles.card__image}`} src={image} alt={imageAlt} layout="fill"/>
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
        default:
            return styles.small
    }
}

export default ImageCard;