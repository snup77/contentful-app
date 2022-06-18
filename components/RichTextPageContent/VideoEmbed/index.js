import VideoEmbedStyles from "./VideoEmbed.module.css";

export default function VideoEmbed(props) {
  const { embedUrl, title } = props;

  return (
    <div className={VideoEmbedStyles.videoEmbed}>
      <iframe
        className={VideoEmbedStyles.videoEmbed__iframe}
        src={embedUrl + "?origin=https://contentful-app-eight.vercel.app/"}
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
