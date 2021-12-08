import Link from "next/link";

const data = () => {
    return (
        <div>
            <Link href='/data/category'>Category </Link>
            <Link href='/data/subCategory'>SubCategory </Link>
            <Link href='/data/article'>Article</Link>
        </div>
    );
}

export default data;