import categories from "../../../../json/categories";

export default function handler(req, res) {
    const {category} = req.query;
    res.status(200).json(categories.find(c => c.id.toLowerCase() === category.toLowerCase()))
}

export function getCategory(category) {
    return categories.find(c => c.id.toLowerCase() === category.toLowerCase())
}