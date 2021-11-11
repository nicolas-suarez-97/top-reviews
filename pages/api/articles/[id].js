import articles from "../../../json/articles";

export default function handler(req, res) {
    const {id} = req.query;
    res.status(200).json(articles.find(c => c.id.toLowerCase() === id.toLowerCase()))
}

export function getArticleById(id) {
    return articles.find(c => c.id.toLowerCase() === id.toLocaleString())
}