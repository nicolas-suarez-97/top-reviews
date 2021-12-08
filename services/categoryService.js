import {getEnvUrl} from "../utils/utils";

const path = `/api/category`;

const getCategoryById = async (categoryId) => {
    const categoryResponse = await fetch(`${path}?id=${categoryId}`);
    let data = await categoryResponse.json();
    return data['message'][0]
}

const addCategory = async (category, router) => {
    if (category._id != null || category.name === '' || category.id === '') return
    category.creationDate = new Date();
    category.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'POST',
                body: JSON.stringify(category)
            }
        );
        let data = await res.json();
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error);
        return error;
    }
}

const updateCategory = async (category, router) => {
    category.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'PUT',
                body: JSON.stringify(category)
            }
        );
        alert('Updated Category')
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error)
        return error;
    }
}

const deleteCategory = async (id, router) => {
    try {
        await fetch(path, {
            method: 'DELETE',
            body: id,
        });
        alert('Deleted Category')
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error)
    }
};

const getCategoryList = async () => {
    const categoryResponse = await fetch(getEnvUrl() + path);
    let data = await categoryResponse.json();
    return data['message']
}

export {
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryList,
}