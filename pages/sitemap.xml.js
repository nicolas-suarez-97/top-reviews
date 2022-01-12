//pages/sitemap.xml.js
import {getCollection} from "../utils/mongodb";

const EXTERNAL_DATA_URL = 'https://top-reviews.app'

function generateSiteMap(articles, categories, subCategories) {
    const staticPages = [
        'about',
        'disclaimer',
        'categories',
    ];
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
    ${staticPages
        .map((id) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `
        })
        .join('')} 
    ${categories
        .map((c) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/categories/${c.id}`}</loc>
       </url>
     `
        })
        .join('')} 
    ${subCategories
        .map((s) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/categories/${s.categoryId}/${s.id}`}</loc>
       </url>
     `
        })
        .join('')} 
    ${articles
        .map(({ id }) => {
            return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `
        })
        .join('')}
   </urlset>
 `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const articles = await getCollection('article', null)
    const categories = await getCollection('category', null)
    const subCategories = await getCollection('subcategory', null)

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(articles, categories, subCategories)

    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}

export default SiteMap