import {useState} from "react";
import {useRouter} from "next/router";
import DataTable from 'react-data-table-component';
import {addSubCategory, updateSubCategory, deleteSubCategory} from "../../services/subCategoryService";
import Data from "./index";
import {getCollection} from "../../utils/mongodb";

const SubCategory = ({categories, subCategories}) => {
    const router = useRouter();
    const [subCategory, setSubCategory] = useState({
        name: '',
        id: '',
        imageUrl: '',
        category: '',
        categoryId: '',
        articles: [],
    });

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'id',
            selector: row => row.id,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'ImageUrl',
            selector: row => row.imageUrl,
        },
        {
            name: 'CreationDate',
            selector: row => row.creationDate,
            sortable: true,
        },
        {
            name: 'Select',
            selector: row => (
                <button onClick={() => setSubCategory(row)}>Select</button>
            )
        },
        {
            name: 'Delete',
            selector: row => (
                <button onClick={() => deleteSubCategory(row, router)}>Delete</button>
            )
        },
        {
            name: 'Image',
            selector: row => (
                <img alt={row.name} src={row.imageUrl} height={100}/>
            )
        },
    ];


    return (
        <div>
            <Data />
            <h1>Add SubCategory</h1>
            <button onClick={() => setSubCategory(
                {
                    name: '',
                    id: '',
                    imageUrl: '',
                    category: '',
                    categoryId: '',
                    articles: [],
                }
            )}>X</button>
            <input
                type="text"
                value={subCategory.name}
                placeholder='name'
                onChange={e => {
                    let id = e.target.value.toLowerCase().replaceAll(' ', '-')
                    setSubCategory({
                        ...subCategory,
                        name: e.target.value,
                        id: id,
                    })
                }}
            />
            <input
                type="text"
                value={subCategory.id}
                placeholder='id'
                onChange={e => {
                    setSubCategory({...subCategory, id: e.target.value})}
                }
            />
            <input
                type="text"
                value={subCategory.imageUrl}
                placeholder='imageUrl'
                onChange={e => setSubCategory({...subCategory, imageUrl: e.target.value})}
            />
            <input
                list="categories"
                placeholder='category'
                value={subCategory.category}
                onChange={e => {
                    const category = categories.find(c => c.id === e.target.value)
                    category != null
                        ? setSubCategory({
                            ...subCategory,
                            category: category.name,
                            categoryId: category.id,
                        })
                        : setSubCategory({
                            ...subCategory,
                            category: e.target.value,
                        });
                }}
            />

            <datalist id="categories">
                {categories.map(c => (
                    <option value={c.id} key={c._id}>{c.name}</option>
                ))}
            </datalist>

            <button onClick={() => addSubCategory(subCategory, router)}>Add</button>
            <button onClick={() => updateSubCategory(subCategory, router)}>Update</button>
            <img alt={subCategory.name} src={subCategory.imageUrl} height={100}/>

            <DataTable title='SubCategories' columns={columns} data={subCategories}/>
        </div>
    );
}

export async function getServerSideProps({params}) {

    let categories = await getCollection('category', null)
    let subCategories = await getCollection('subcategory', null)

    return {
        props: {
            categories: categories,
            subCategories: subCategories
        }
    }
}


export default SubCategory;