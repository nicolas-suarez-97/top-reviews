import {getEnvUrl} from "../utils/utils";

const path = `/api/article`;

const getArticleById = async (categoryId) => {
    const articleResponse = await fetch(`${path}?id=${categoryId}`);
    let data = await articleResponse.json();
    return data['message'][0]
}

const addArticle = async (article, router) => {
    if (article._id != null || article.name === '' || article.id === '') return
    article.creationDate = new Date();
    article.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'POST',
                body: JSON.stringify(article)
            }
        );
        let data = await res.json();
        console.log(data);
        alert('Added');
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error);
        return error;
    }
}

const updateArticle = async (article, router) => {
    article.modificationDate = new Date();
    try {
        const res = await fetch(path,
            {
                method: 'PUT',
                body: JSON.stringify(article)
            }
        );
        alert('Updated')
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error)
        return error;
    }
}

const deleteArticle = async (id, router) => {
    try {
        await fetch(path, {
            method: 'DELETE',
            body: id,
        });
        alert('Deleted')
        return router.push(router.asPath);
    } catch (error) {
        console.log(error)
        alert(error)
        return error
    }
};

const getArticleList = async () => {
    const articleResponse = await fetch(getEnvUrl() + path);
    let data = await articleResponse.json();
    return data['message']
}

export {
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleList,
}