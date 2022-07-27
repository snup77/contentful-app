import Image from "next/image"
import Link from "next/link"
import PublishedDate from "../PublishedDate/index"

export default function ArticleList({ articles }) {
  return (
    <div className="max-w-5xl m-auto">
      <div className="flex flex-1 flex-wrap flex-row">
        {articles.map((article, index) => {
          const widthStyle = index != 0 ? "md:w-1/2" : ""
          return (
            <div
              className={`w-full px-6 my-6 ${widthStyle}`}
              key={article.sys.id}
            >
              <Link href={`/articles/${article.slug}`}>
                <a>
                  <Image
                    src={article.heroImage.url}
                    alt={article.heroImage.description}
                    width={article.heroImage.width}
                    height={article.heroImage.height}
                    layout="responsive"
                  />
                  <PublishedDate
                    date={article.date}
                    datetime={article.datetime}
                    styles=" text-sm text-left mb-1 mt-4"
                  />
                  <h2 className="mb-2">{article.title}</h2>
                  <p className="text-base">{article.excerpt}</p>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
