export default function PublishedDate(props) {
  const { date } = props
  const { datetime } = props

  return <time className={`block ${props.styles} text-zinc-500`} dateTime={datetime}>{date}</time>
}
