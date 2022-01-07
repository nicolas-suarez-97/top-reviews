import React from "react";
import ImageCard from "../ImageCard";
import styles from "./relatedArticles.module.scss";

const RelatedArticles = ({articles}) => {
    return (
        <div className={styles.container}>
            <h1>Related Articles</h1>
            <div className={styles.main}>
                <div className={styles.articles}>
                    {articles.map((a, index)=> index < 5 ? (
                            <ImageCard
                                key={a._id}
                                size='small-square'
                                image={a.imageUrl}
                                title={a.title}
                                elevation={2}
                                link={`/${a.id}`}
                                className={styles.image}
                            />
                        )
                        : null
                    )}
                </div>
            </div>
        </div>
    );
}

export default RelatedArticles;