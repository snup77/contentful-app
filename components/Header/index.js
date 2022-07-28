import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a>
            <Image src="/logo.svg" height={58} width={58} />
            <span className="font-nunito-bold text-3xl">
              commerce<span className="text-[#672EC4]">worm</span>
            </span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/articles">
          <a>Articles</a>
        </Link>
      </div>
    </header>
  )
}
