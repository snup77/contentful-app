import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="max-w-5xl px-6 my-6 mx-auto sm:flex sm:justify-between sm:items-center">
      <div className="text-center">
        <Link href="/">
          <a>
            <Image src="/logo.svg" height={40} width={40} />
            <span className="font-nunito-bold text-2xl relative bottom-2.5 left-2">
              commerce<span className="text-[#672EC4]">worm</span>
            </span>
          </a>
        </Link>
      </div>
      <div className="font-roboto uppercase text-center pt-2 text-sm sm:text-base">
        <Link href="/articles">
          <a>Articles</a>
        </Link>
        <Link href="/about">
          <a className="ml-6">About</a>
        </Link>
      </div>
    </header>
  )
}
