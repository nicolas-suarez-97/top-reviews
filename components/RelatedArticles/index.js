import React from "react";
import ImageCard from "../ImageCard";
import styles from "./relatedArticles.module.scss";
import Link from "next/link";

const RelatedArticles = ({articles}) => {
    return (
        <div className={styles.container}>
            <h1>Related Articles</h1>
            <div className={styles.main}>
                <div className={styles.articles}>
                    {articles.map((a, index)=> index < 5 ? (
                        <Link href={`/${a.id}`} key={a._id} passHref>
                            <a>
                                <ImageCard
                                    size='small-square'
                                    image={a.imageUrl}
                                    imageAlt={a.title}
                                    title={a.title}
                                    elevation={2}
                                    link={`/${a.id}`}
                                    className={styles.image}
                                />
                            </a>
                        </Link>
                        )
                        : null
                    )}
                </div>
            </div>
        </div>
    );
}

export default RelatedArticles;