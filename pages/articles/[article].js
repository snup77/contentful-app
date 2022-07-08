import Image from "next/image"
import {
  callContentful,
  getSlugs,
  getArticle,
} from "../../utils/contentful-api"
import RichTextPageContent from "../../components/RichTextPageContent"
import {
  formatPublishedDateForDisplay,
  formatPublishedDateForDateTime,
} from "../../utils/date"
import PublishedDate from "../../components/PublishedDate"

export default function ArticleContent({ articleData }) {
  return (
    <div>
      <h1>{articleData.title}</h1>
      <PublishedDate date={articleData.date} datetime={articleData.datetime} />
      <Image
        src={articleData.heroImage.url}
        alt={articleData.heroImage.description}
        width={500}
        height={500}
      />
      <RichTextPageContent
        richTextBodyField={articleData.body}
        renderH2Links={true}
      />
    </div>
  )
}

export async function getStaticPaths() {
  const response = await callContentful(getSlugs, { limit: 10 })
  const articleSlugs = response.data.blogPostCollection.items

  const paths = articleSlugs.map((slug) => {
    const article = String(slug.slug)
    return {
      params: { article },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const response = await callContentful(getArticle, { slug: params.article })
  const [articleData] = response.data.blogPostCollection.items

  articleData.date = formatPublishedDateForDisplay(articleData.date)
  articleData.datetime = formatPublishedDateForDateTime(articleData.date)

  return {
    props: {
      articleData,
    },
  }
}
