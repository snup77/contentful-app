import Link from "next/link"
import Image from "next/image"
import { callContentful, getPostList } from "../../utils/contentful-api"
import {
  formatPublishedDateForDisplay,
  formatPublishedDateForDateTime,
} from "../../utils/date"
import PublishedDate from "../../components/PublishedDate"
import SignupForm from "../../components/SignupForm"

export default function ArticleList({ postList }) {
  return (
    <div>
      <main>
        {postList.map((post) => (
          <div key={post.sys.id}>
            <Image
              src={post.heroImage.url}
              alt={post.heroImage.description}
              width={post.heroImage.width}
              height={post.heroImage.height}
              layout="responsive"
            />
            <Link href={`/articles/${post.slug}`}>
              <a>
                <h1>{post.title}</h1>
              </a>
            </Link>
            <p>{post.excerpt}</p>
            <PublishedDate
              date={post.date}
              datetime={post.datetime}
              styles="text-left pb-6"
            />
          </div>
        ))}
      </main>
      <SignupForm />
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
