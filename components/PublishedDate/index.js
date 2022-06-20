import {
    formatPublishedDateForDisplay,
    formatPublishedDateForDateTime,
} from "../../utils/date"
  
export default function PublishedDate(props) {
    const { date } = props;

    return (
      <time
        dateTime={formatPublishedDateForDateTime(date)}
      >
        {formatPublishedDateForDisplay(date)}
      </time>
    );
}