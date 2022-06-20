export default function PublishedDate(props) {
  const { date } = props
  const { datetime } = props

  return <time dateTime={datetime}>{date}</time>
}
