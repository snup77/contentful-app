import Head from "next/head"
import Link from "next/link"
import { callContentful, getPostList } from "../utils/contentful-api"
import { formatPublishedDateForDisplay } from "../utils/date"

export default function Home({ recentPostList }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {recentPostList.map((post) => (
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
        <Link href="/articles">
          <a>See All Articles</a>
        </Link>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await callContentful(getPostList, { limit: 2 })
  const recentPostList = response.data.blogPostCollection.items

  return {
    props: {
      recentPostList,
    },
  }
}
