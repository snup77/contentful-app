import { callContentful, getSlugs, getArticle } from "../../utils/contentful-api"

export default function ArticleContent({ articleData }) {
    return (
        <div>
            <h1>{articleData.title}</h1>
            <p>{articleData.slug}</p>
        </div>
    )
}

export async function getStaticPaths() {
    const response = await callContentful(getSlugs, { limit: 10 })
    const articleSlugs = response.data.blogPostCollection.items
  
    const paths = articleSlugs.map((slug) => {    
      const article = String(slug.slug)
      return {
        params: { article }
      }
    })
  
    return {
      paths,
      fallback: false,
    }
}
  
export async function getStaticProps({ params }) {
    const response = await callContentful(getArticle, { slug: params.article })
    const [ articleData ] = response.data.blogPostCollection.items
  
    return {
      props: {
        articleData,
      },
    }
  }


