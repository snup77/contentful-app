export default function PublishedDate(props) {
  const { date } = props
  const { datetime } = props

  return <time className="block text-center text-zinc-500 pb-6" dateTime={datetime}>{date}</time>
}
