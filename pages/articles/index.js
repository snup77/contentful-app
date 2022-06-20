import Link from "next/link"
import { callContentful, getPostList } from "../../utils/contentful-api"
import { formatPublishedDateForDisplay } from "../../utils/date"

export default function ArticleList({ postList }) {
  return (
    <div>
      <main>
        {postList.map((post) => (
          <div key={post.sys.id}>
            <Link href={`articles/${post.slug}`}>
              <a>
                <h1>{post.title}</h1>
              </a>
            </Link>
            <p>{post.excerpt}</p>
            <p>{formatPublishedDateForDisplay(post.date)}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await callContentful(getPostList, { limit: 25 })
  const postList = response.data.blogPostCollection.items

  return {
    props: {
      postList,
    },
  }
}
