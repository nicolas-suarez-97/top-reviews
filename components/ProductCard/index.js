import React, {useEffect, useState} from "react";
import ImageCard from "../ImageCard";
import styles from "./styles.module.scss";
import {getElevation} from "../../utils/utils";

const ProductCard = ({product, className, number}) => {
    const {imageUrl, link, storeUrl, name, store, rating, imageAlt, about} = product;
    const formatAbout = about ? about.split(/\n/) : null;
    const [expand, setExpand] = useState(false);

    const toggleExpand = () => {
        expand ?
            setExpand(false) :
            setExpand(true)
    }
    return (
        <div className={`${styles.product} ${getElevation(2)} ${className}`}>
            <a href={link} target="_blank" className={`${styles.product__container}`} rel="noreferrer">
                {
                    number ? (<div className={`${styles.product__number} ${getElevation(2)}`}>{number}</div>) : null
                }
                <div className={styles.product__imageInfo}>
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
                        <a href={storeUrl} target="_blank" rel="noreferrer">
                            <p className={styles.product__store}>{store}</p>
                        </a>
                    </div>
                </div>
                <div className={styles.product__more}>
                    <p className={styles.product__rating}>{rating}</p>
                    <a href={link} target="_blank" rel="noreferrer">
                        <p className={styles.product__moreInfo}>Go to Amazon</p>
                    </a>
                </div>
            </a>
            {formatAbout !== null ? (
                <section>
                    <div className={`${styles.product__aboutContainer} `}>
                        <div className={`${styles.product__about} ${expand ? styles.expand : styles.less}`}>
                            <h4>About this product</h4>
                            <ul className={styles.aboutItems}>
                                {formatAbout.map(a => (
                                    <li key={a} className={styles.aboutItem}>{a}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.product__expand} onClick={toggleExpand}>
                        <button aria-label="more info" className={`material-icons ${expand ? styles.rotateOn : styles.rotateOff}`}>expand_more</button>
                    </div>
                </section>
            ) : null}
        </div>
    );
}

export default ProductCard;