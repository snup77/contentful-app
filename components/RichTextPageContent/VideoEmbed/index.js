export default function VideoEmbed(props) {
  const { embedUrl, title } = props;

  return (
    <div>
      <iframe
        src={embedUrl}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        title={title}
        allowFullScreen={true}
      />
    </div>
  );
}
