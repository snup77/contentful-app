export default function PublishedDate(props) {
  const { date } = props
  const { datetime } = props

  return <time className="block text-center pb-5" dateTime={datetime}>{date}</time>
}
