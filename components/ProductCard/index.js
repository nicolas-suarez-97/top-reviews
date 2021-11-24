import React from "react";
import ImageCard from "../ImageCard";
import styles from "./styles.module.scss";
import Link from "next/link";
import {getElevation} from "../../utils/utils";

const ProductCard = ({product}) => {
    const {number, imageUrl, link, storeUrl, name, store, rating, imageAlt} = product;
    return (
        <Link href={link}>
            <a className={`${styles.product} ${getElevation(2)}`}>
                {
                    number ? (<div className={`${styles.product__number} ${getElevation(2)}`}>{number}</div>) : null
                }
                <div className={styles.product__image}>
                    <ImageCard
                        size='small-square'
                        image={imageUrl}
                        elevation={0}
                        link={link}
                        imageAlt={imageAlt}
                    />
                </div>
                <div className={styles.product__info}>
                    <p className={styles.product__title}>{name}</p>
                    <Link href={storeUrl} passHref>
                        <p className={styles.product__store}>{store}</p>
                    </Link>
                </div>
                <div className={styles.product__more}>
                    <p className={styles.product__rating}>{rating}</p>
                    <Link href={link} passHref>
                        <p className={styles.product__moreInfo}>More Info</p>
                    </Link>
                </div>
            </a>
        </Link>
    );
}

export default ProductCard;