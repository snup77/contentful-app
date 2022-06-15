import { callContentful, getPostList } from "../../utils/contentful-api"

export default function ArticleList({ postList }) {
  return (
    <div>
      <main>
        {postList.map((post) => (
          <div key={post.sys.id}>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
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
