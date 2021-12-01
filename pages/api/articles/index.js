import articles from "../../../json/articles";
import {getArticleById} from "./[id]";

export default function handler(req, res) {
    res.status(200).json(articles.map(a => a.id))
}

function getArticlesIds() {
    return articles.map(a => a.id)
}

function getArticles() {
    return articles.map(a => ({
        id: a.id,
        imageUrl: a.imageUrl,
        link: `/${a.id}`,
        title: a.title,
        categoryId: a.categoryId,
        subCategoryId: a.subCategoryId,
    }))
}

export {
    getArticlesIds,
    getArticleById,
    getArticles
}