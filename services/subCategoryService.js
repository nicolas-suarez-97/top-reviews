import {updateCategory} from "./categoryService";
import {getCategoryById} from "./categoryService";
import {getEnvUrl} from "../utils/utils";

const path = `/api/subcategory`;

const getSubCategoryById = async (id) => {
    try {
        const res = await fetch(`${path}?id=${id}`);
        let data = await res.json();
        return data['message'][0];
    } catch (error) {
        alert(error)
    }
}

const addSubCategory = async (subCategory, router) => {
    if (subCategory._id != null || subCategory.name === '' || subCategory.id === '' || subCategory.categoryId === '') return
    subCategory.creationDate = new Date();
    subCategory.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'POST',
                body: JSON.stringify(subCategory)
            }
        );
        subCategory = await getSubCategoryById(subCategory.id);
        console.log(subCategory)
        let category = await getCategoryById(subCategory.categoryId);
        console.log(category)
        category.subCategories = [
            ...category.subCategories,
            {
                _id: subCategory._id,
                name: subCategory.name,
                id: subCategory.id,
            },
        ]
        await updateCategory(category, router);
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error);
        return error;
    }
}

const updateSubCategory = async (subCategory, router) => {
    subCategory.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'PUT',
                body: JSON.stringify(subCategory)
            }
        );
        alert('Updated SubCategory')
        let category = await getCategoryById(subCategory.categoryId);
        if (category != null) {
            let index = category.subCategories.findIndex(s => s._id === subCategory._id)
            category.subCategories[index] = subCategory;
            await updateCategory(category, router);
        }
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error)
        return error;
    }
}

const deleteSubCategory = async (subCategory, router) => {
    let ok = confirm('Delete SubCategory?');
    if (ok) {
        try {
            await fetch(path, {
                method: 'DELETE',
                body: subCategory._id,
            });
            alert('Deleted SubCategory')
            let category = await getCategoryById(subCategory.categoryId);
            if (category != null) {
                let index = category.subCategories.findIndex(s => s._id === subCategory._id)
                category.subCategories.splice(index, 1);
                await updateCategory(category, router);
            }
            return router.push(router.asPath);
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
};

const getSubCategoryList = async () => {
    try {
        const res = await fetch(getEnvUrl() + path);
        let data = await res.json();
        return data['message'];
    } catch (error) {
        alert(error)
    }
}


export {
    getSubCategoryById,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory
}