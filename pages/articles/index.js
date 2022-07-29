import { callContentful, getPostList } from "../../utils/contentful-api"
import {
  formatPublishedDateForDisplay,
  formatPublishedDateForDateTime,
} from "../../utils/date"
import Header from "../../components/Header"
import ArticleList from "../../components/ArticleList"
import SignupForm from "../../components/SignupForm"

export default function List({ postList }) {
  return (
    <div>
      <Header />
      <main>
      <ArticleList articles={postList} />
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
