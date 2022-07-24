export default function PublishedDate(props) {
  const { date } = props
  const { datetime } = props

  return <time className={`block ${props.textAlign} text-zinc-500 pb-6`} dateTime={datetime}>{date}</time>
}
