import categories from "../../../json/categories";
import {getCategory} from "./[category]";
import {getSubcategory} from "./[category]/[subcategory]";

export default function handler(req, res) {

    res.status(200).json(categories.map(c => {
        return {
            name: c.name,
            id: c.id,
            subCategories: c.subcategories.map(d => d.name),
            subCategoriesId: c.subcategories.map(s => s.id),
            imageUrl: c.imageUrl
        }
    }))
}

function getCategoryList() {
    return categories.map(c => {
        return {
            name: c.name,
            id: c.id,
            subCategories: c.subcategories.map(d => d.name),
            subCategoriesId: c.subcategories.map(s => s.id),
            imageUrl: c.imageUrl
        }
    })
}

export {
    getCategoryList,
    getCategory,
    getSubcategory
}