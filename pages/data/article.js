import {getEnvUrl} from "../../utils/utils";
import {useState} from "react";
import {useRouter} from "next/router";
import DataTable from 'react-data-table-component';
import {addArticle, updateArticle, deleteArticle} from "../../services/articleService";
import Data from "./index";

const article = ({categories, subCategories, articles}) => {
    const router = useRouter();
    const [index, setIndex] = useState(-1);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [article, setArticle] = useState({
        title: '',
        id: '',
        imageUrl: '',
        link: '',
        category: '',
        categoryId: '',
        subCategory: '',
        subCategoryId: '',
        author: '',
        products: []
    });
    const [product, setProduct] = useState({
        name: '',
        store: '',
        storeUrl: '',
        price: '',
        link: '',
        imageUrl: '',
        imageAlt: '',
        rating: '',
        number: '',
    });

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'Subcategory',
            selector: row => row.subCategory,
        },
        {
            name: 'ImageUrl',
            selector: row => row.imageUrl,
        },
        {
            name: 'Select',
            selector: row => (
                <button onClick={() => setArticle(row)}>Select</button>
            )
        },
        {
            name: 'Delete',
            selector: row => (
                <button onClick={() => deleteArticle(row._id, router)}>Delete</button>
            )
        },
        {
            name: 'Image',
            selector: row => (
                <img alt={row.name} src={row.imageUrl} height={100}/>
            )
        },
    ];

    const productColumns = [
        {
            name: 'Title',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Link',
            selector: row => (<a href={row.link} target="_blank" rel="noreferrer" >{row.link}</a>)
        },
        {
            name: 'Store',
            selector: row => row.store,
        },
        {
            name: 'Store Url',
            selector: row => (<a href={row.storeUrl} target="_blank" rel="noreferrer" >{row.storeUrl}</a>),
        },
        {
            name: 'Rating',
            selector: row => row.rating,
        },
        {
            name: 'Number',
            selector: row => row.number,
        },
        {
            name: 'ImageUrl',
            selector: row => row.imageUrl,
        },
        {
            name: 'Image',
            selector: row => (
                <img alt={row.name} src={row.imageUrl} height={100}/>
            )
        },
    ];

    const ExpandedComponent = ({data}) => (<DataTable columns={productColumns} data={data.products}/>);

    const selectProduct = (p) => {
        setProduct(p)
        const index = article.products.findIndex(prod => prod.name === p.name)
        setIndex(index)
    }

    const addProduct = () => {
        article.id !== '' ?
            article.products.push(product)
            : alert('No article selected')
        router.push(router.asPath);
    }

    const updateProduct = () => {
        article.products[index] = product
        alert('Updated')
        router.push(router.asPath)
    }

    const deleteProduct = (name) => {
        const index = article.products.findIndex(p => p.name === name)
        article.products.splice(index, 1)
        alert('Deleted')
        router.push(router.asPath)
    }

    return (
        <div>
            <Data />
            <h1>Add Article</h1>
            <input
                type="text"
                value={article.title}
                placeholder='Title'
                onChange={e => {
                    let id = e.target.value.toLowerCase().replaceAll(' ', '-')
                    setArticle({
                        ...article,
                        title: e.target.value,
                        id: id,
                    })
                }}
            />
            <input
                type="text"
                value={article.id}
                placeholder='id'
                onChange={e => setArticle({...article, id: e.target.value})}
            />
            <input
                type="text"
                value={article.imageUrl}
                placeholder='ImageUrl'
                onChange={e => setArticle({...article, imageUrl: e.target.value})}
            />
            <input
                list="categories"
                placeholder='Category'
                value={article.category}
                onChange={e => {
                    const category = categories.find(c => c.id === e.target.value)
                    category != null ?
                        setArticle({
                            ...article,
                            category: category.name,
                            categoryId: category.id,
                        })
                        : setArticle({
                            ...article,
                            category: e.target.value,
                        });
                    category != null ?
                        setSubCategoryList(subCategories.filter(s => s.categoryId === category.id))
                        : null;
                }}
            />

            <datalist id="categories">
                {categories.map(c => (
                    <option value={c.id} key={c._id}>{c.name}</option>
                ))}
            </datalist>

            <input
                list="subCategory"
                placeholder='SubCategory'
                value={article.subCategory}
                onChange={e => {
                    const subCategory = subCategoryList.find(c => c.id === e.target.value)
                    subCategory != null
                        ? setArticle({
                            ...article,
                            subCategory: subCategory.name,
                            subCategoryId: subCategory.id,
                        })
                        : setArticle({
                            ...article,
                            subCategory: e.target.value,
                        });
                }}
            />

            <datalist id="subCategory">
                {subCategoryList.map(c => (
                    <option value={c.id} key={c._id}>{c.name}</option>
                ))}
            </datalist>

            <button onClick={() => addArticle(article, router)}>Add</button>
            <button onClick={() => updateArticle(article, router)}>Update</button>
            <button onClick={() => setArticle(
                {
                    title: '',
                    id: '',
                    imageUrl: '',
                    link: '',
                    category: '',
                    categoryId: '',
                    subCategory: '',
                    subCategoryId: '',
                    author: '',
                    products: []
                }
            )}>X</button>
            <img alt={article.name} src={article.imageUrl} height={100}/>

            <h3>Product</h3>
            <input
                type="text"
                value={product.name}
                placeholder='Product Name'
                onChange={e => {
                    setProduct({
                        ...product,
                        name: e.target.value,
                        imageAlt: e.target.value,
                    })
                }}
            />
            <input
                type="text"
                value={product.store}
                placeholder='Store'
                onChange={e => setProduct({...product, store: e.target.value})}
            />
            <input
                type="text"
                value={product.storeUrl}
                placeholder='Store Url'
                onChange={e => setProduct({...product, storeUrl: e.target.value})}
            />
            <input
                type="text"
                value={product.price}
                placeholder='Price'
                onChange={e => setProduct({...product, price: e.target.value})}
            />
            <input
                type="text"
                value={product.link}
                placeholder='Link'
                onChange={e => setProduct({...product, link: e.target.value})}
            />
            <input
                type="text"
                value={product.imageUrl}
                placeholder='Image Url'
                onChange={e => setProduct({...product, imageUrl: e.target.value})}
            />
            <input
                type="text"
                value={product.imageAlt}
                placeholder='Image Alt'
                onChange={e => setProduct({...product, imageAlt: e.target.value})}
            />
            <input
                type="number"
                list='rating'
                value={product.rating}
                placeholder='Rating'
                onChange={e => setProduct({...product, rating: e.target.value})}
            />
            <datalist id="rating">
                <option value={5} />
                <option value={4} />
                <option value={3} />
                <option value={2} />
                <option value={1} />
            </datalist>
            <input
                type="number"
                list='numbers'
                value={product.number}
                placeholder='Number'
                onChange={e => setProduct({...product, number: e.target.value})}
            />
            <datalist id="numbers">
                <option value={1} />
                <option value={2} />
                <option value={3} />
                <option value={4} />
                <option value={5} />
                <option value={6} />
                <option value={7} />
                <option value={8} />
                <option value={9} />
                <option value={10} />
            </datalist>
            <button onClick={() => addProduct()}>Add</button>
            <button onClick={() => updateProduct()}>Update</button>
            <button onClick={() => setProduct({
                name: '',
                store: '',
                storeUrl: '',
                price: '',
                link: '',
                imageUrl: '',
                imageAlt: '',
                rating: '',
                number: '',
            })}>x</button>
            <img alt={product.name} src={product.imageUrl} height={100}/>

            <table>
                {article.products.map(p => (
                    <tr key={p.name}>
                        <td><h5>{p.name}</h5></td>
                        <td><a href={p.link} target="_blank" rel="noreferrer" >{p.link}</a></td>
                        <td><button onClick={() => selectProduct(p)}>Select</button></td>
                        <td><button onClick={() => deleteProduct(p.name)}>Delete</button></td>
                        <td><img alt={p.name} src={p.imageUrl} height={100}/></td>
                    </tr>
                ))}
            </table>

            <DataTable title='Articles' columns={columns} data={articles} expandableRows={true} expandableRowsComponent={ExpandedComponent}/>
        </div>
    );
}

export async function getStaticProps({params}) {

    let categoryList = await fetch(`${getEnvUrl()}/api/category`);
    let subCategorylist = await fetch(`${getEnvUrl()}/api/subcategory`);
    let articleList = await fetch(`${getEnvUrl()}/api/article`);
    let categories = await categoryList.json();
    let subCategories = await subCategorylist.json();
    let articles = await articleList.json();

    return {
        props: {
            categories: categories['message'],
            subCategories: subCategories['message'],
            articles: articles['message'],
        }
    }
}


export default article;