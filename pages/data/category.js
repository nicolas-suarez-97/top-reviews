import {useState} from "react";
import {useRouter} from "next/router";
import DataTable from 'react-data-table-component';
import {addCategory, updateCategory, deleteCategory} from "../../services/categoryService";
import Data from "./index";
import {getCollection} from "../../utils/mongodb";

const Category = ({data}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        id: '',
        imageUrl: '',
        subCategories: [],
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
            name: 'ImageUrl',
            selector: row => row.imageUrl,
        },
        {
            name: 'Creation Date',
            selector: row => row.creationDate,
            sortable: true,
        },
        {
            name: 'Select',
            selector: row => (
                <button onClick={() => setCategory(row)}>Select</button>
            )
        },
        {
            name: 'Delete',
            selector: row => (
                <button onClick={() => deleteCategory(row._id, router)}>{loading ? 'Loading...' : 'Delete'}</button>
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
            <h1>Add Category</h1>
            <table>
                <tr>
                    <td>
                        <button onClick={() => setCategory(
                            {
                                name: '',
                                id: '',
                                imageUrl: '',
                                subCategories: [],
                            }
                        )}>X</button>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={category.name}
                            placeholder='name'
                            onChange={e => {
                                let id = e.target.value.toLowerCase().replaceAll(' ', '-')
                                setCategory({
                                    ...category,
                                    name: e.target.value,
                                    id: id,
                                })
                            }}
                        />
                        <input
                            type="text"
                            value={category.id}
                            placeholder='id'
                            onChange={e => setCategory({...category, id: e.target.value})}
                        />
                        <input
                            type="text"
                            value={category.imageUrl}
                            placeholder='imageUrl'
                            onChange={e => setCategory({...category, imageUrl: e.target.value})}
                        />
                    </td>
                    <td>
                        <button onClick={() => addCategory(category, router)}>{loading ? 'Loading...' : 'Add'}</button>
                        <button onClick={() => updateCategory(category, router)}>{loading ? 'Loading...' : 'Update'}</button>
                    </td>
                    <td>
                        <img alt={category.name} src={category.imageUrl} height={100}/>
                    </td>
                </tr>
            </table>
            <ul>
                {category.subCategories.map(s => (
                    <li key={s.id}>
                        {s.name}
                    </li>
                ))}
            </ul>

            <DataTable title='Categories' columns={columns} data={data}/>
        </div>
    );
}

export async function getServerSideProps({params}) {
    let category = await getCollection('category', null)

    return {
        props: {
            data: category
        }
    }
}


export default Category;