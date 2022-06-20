import Link from "next/link"
import { callContentful, getPostList } from "../../utils/contentful-api"
import {
  formatPublishedDateForDisplay,
  formatPublishedDateForDateTime,
} from "../../utils/date"
import PublishedDate from "../../components/PublishedDate"

export default function ArticleList({ postList }) {
  return (
    <div>
      <main>
        {postList.map((post) => (
          <div key={post.sys.id}>
            <Link href={`/articles/${post.slug}`}>
              <a>
                <h1>{post.title}</h1>
              </a>
            </Link>
            <p>{post.excerpt}</p>
            <PublishedDate date={post.date} datetime={post.datetime} />
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await callContentful(getPostList, { limit: 25 })
  const postList = response.data.blogPostCollection.items

  postList.map((post, index) => {
    
    postList[index].date = formatPublishedDateForDisplay(post.date)
    postList[index].datetime = formatPublishedDateForDateTime(post.date)

  })

  return {
    props: {
      postList,
    },
  }
}
