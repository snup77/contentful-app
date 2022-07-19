export default function VideoEmbed(props) {
  const { embedUrl, title } = props;

  return (
    <div className="relative pb-[56.25%] mb-8">
      <iframe
        src={embedUrl}
        height="100%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        title={title}
        allowFullScreen={true}
        className="absolute top-0 left-0"
      />
    </div>
  );
}
