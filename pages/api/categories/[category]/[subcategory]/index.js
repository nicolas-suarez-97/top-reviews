import categories from "../../../../../json/categories";

export default function handler(req, res) {
    const {category, subcategory} = req.query;
    const categoryObj = categories.find(c => c.id.toLowerCase() === category.toLowerCase());
    res.status(200).json(categoryObj.subcategories.find(d => d.id.toLowerCase() === subcategory.toLowerCase()))
}

export function getSubcategory(category, subcategory) {
    const categoryObj = categories.find(c => c.id.toLowerCase() === category.toLowerCase());
    return categoryObj.subcategories.find(d => d.id.toLowerCase() === subcategory.toLowerCase())
}