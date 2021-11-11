import articles from "../../../json/articles";
import {getArticleById} from "./[id]";

export default function handler(req, res) {
    res.status(200).json(articles.map(a => a.id))
}

function getArticles() {
    return articles.map(a => a.id)
}

export {
    getArticles,
    getArticleById
}