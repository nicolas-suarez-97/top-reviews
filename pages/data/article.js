import {useState, useEffect } from "react";
import {useRouter} from "next/router";
import DataTable from 'react-data-table-component';
import {addArticle, updateArticle, deleteArticle} from "../../services/articleService";
import Data from "./index";
import {getCollection} from "../../utils/mongodb";
import styles from "./article.module.scss";
import Head from "next/head";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Article = ({categories, subCategories, articles}) => {
    const { quill, quillRef } = useQuill();
    const [expand, setExpand] = useState(false);
    const router = useRouter();
    const [index, setIndex] = useState(-1);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [urlId, setUrlId] = useState("");
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
        products: [],
        description: ''
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
        about: '',
    });

    const columns = [
        {
            name: 'Image',
            selector: row => (
                <img alt={row.name} src={row.imageUrl} height={100}/>
            )
        },
        {
            name: 'Select',
            selector: row => (
                <button onClick={() => setArticle(row)}>Select</button>
            )
        },
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
            name: 'ProductNumber',
            selector: row => row.products.length,
        },
        {
            name: 'Delete',
            selector: row => (
                <button onClick={() => deleteArticle(row._id, router)}>Delete</button>
            )
        },
    ];

    const productColumns = [
        {
            name: 'Image',
            selector: row => (
                <img alt={row.name} src={row.imageUrl} height={100}/>
            )
        },
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
    ];

    const ExpandedComponent = ({data}) => (<DataTable columns={productColumns} data={data.products}/>);

    const loadDescription = () => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(article.description ? article.description : '');
        }
    }

    const saveDescription = () => {
        const html = quill.root.innerHTML;
        console.log('update description', html)
        setArticle({
            ...article,
            description: html,
        });
    }

    const toggleExpand = () => {
        if (expand) {
            setExpand(false);
        } else {
            setExpand(true)
            loadDescription()
        }
    }

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
        let ok = confirm('Delete product?');
        if (ok) {
            const index = article.products.findIndex(p => p.name === name)
            article.products.splice(index, 1)
            alert('Deleted')
            router.push(router.asPath)
        }
    }

    return (
        <div>
            <Head>
                <title>Article</title>
            </Head>
            <div className={styles.test}>
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
                <textarea
                    cols="40"
                    rows="4"
                    value={article.description}
                    placeholder='Article description'
                    onChange={e => setArticle({...article, description: e.target.value})}
                />
                <div className={`${expand ? styles.block: styles.none} ${styles.shadow}`}>
                    <div className={styles.article}>
                        <div className={`${expand ? styles.expand : styles.less}`}>
                            <h2>Description Editor</h2>
                            <h5 onClick={toggleExpand}>Exit</h5>
                            <button onClick={() => {
                                loadDescription()
                            }}>Load</button>
                            <button onClick={() => {
                                console.log(article)
                            }}>Log</button>
                            <button onClick={() => {
                                saveDescription()
                            }}>Save</button>
                            <button onClick={() => {
                                quill.clipboard.dangerouslyPasteHTML('');
                            }}>X</button>
                            <div ref={quillRef} />
                        </div>
                    </div>
                </div>

                <button onClick={() => addArticle(article, router)}>Add</button>
                <button onClick={() => updateArticle(article, router)}>Update</button>
                <button onClick={toggleExpand}>Editor</button>
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
                        products: [],
                        description: ''
                    }
                )}>X</button>
                <img alt={article.name} src={article.imageUrl} height={100}/>
                <h3>Product</h3>
                <button onClick={() => {
                    setProduct({
                        name: '',
                        store: '',
                        storeUrl: '',
                        price: '',
                        link: '',
                        imageUrl: '',
                        imageAlt: '',
                        rating: '',
                        number: '',
                        about: '',
                    })
                    setUrlId("")
                }}>x</button>
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
                    placeholder="url id"
                    value={urlId}
                    onChange={e => {
                        setUrlId(e.target.value)
                        setProduct({...product, link: `https://www.amazon.com/dp/${e.target.value}`})
                    }}
                />
                <p>{product.link}</p>
                <textarea
                    cols="30"
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
                    <option value={4.9} />
                    <option value={4.8} />
                    <option value={4.7} />
                    <option value={4.6} />
                    <option value={4.5} />
                    <option value={4.4} />
                    <option value={4.3} />
                    <option value={4.2} />
                    <option value={4.1} />
                    <option value={4} />
                </datalist>
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
                <textarea
                    cols="40"
                    rows="5"
                    value={product.about}
                    placeholder='About the product'
                    onChange={e => setProduct({...product, about: e.target.value})}
                />
                <button onClick={() => addProduct()}>Add</button>
                <button onClick={() => updateProduct()}>Update</button>
                <button onClick={() => {
                    setProduct({
                        name: '',
                        store: '',
                        storeUrl: '',
                        price: '',
                        link: '',
                        imageUrl: '',
                        imageAlt: '',
                        rating: '',
                        number: '',
                        about: '',
                    })
                    setUrlId("")
                }
                }>x</button>
                <img alt={product.name} src={product.imageUrl} height={100}/>

            </div>
            <table className={styles.container}>
                {article.products.map(p => (
                    <tr key={p.name}>
                        <td><img alt={p.name} src={p.imageUrl} height={100}/></td>
                        <td><p>{p.rating}</p></td>
                        <td><h3>{p.about ? p.about.split(/\n/).length : '0'}</h3></td>
                        <td><h5>{p.name}</h5></td>
                        {/*<td><a href={p.storeUrl}>{p.storeUrl}</a></td>*/}
                        <td><a href={p.link} target="_blank" rel="noreferrer" >{p.link}</a></td>
                        <td><button onClick={() => selectProduct(p)}>Select</button></td>
                        <td><button onClick={() => deleteProduct(p.name)}>Delete</button></td>
                    </tr>
                ))}
            </table>

            <DataTable title='Articles' columns={columns} data={articles} expandableRows={true} expandableRowsComponent={ExpandedComponent}/>
        </div>
    );
}

export async function getServerSideProps({params}) {

    let categories = await getCollection('category', null)
    let subCategories = await getCollection('subcategory', null)
    let article = await getCollection('article', null)

    return {
        props: {
            categories: categories,
            subCategories: subCategories,
            articles: article,
        }
    }
}

export default Article;