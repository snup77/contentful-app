import Prism from "prismjs";
import { useEffect } from "react";

export default function CodeBlock(props) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const { language, code } = props;

  return (
    <pre className={`my-8 mx-0 language-${language}`}>
      <code className="overflow-x-auto whitespace-pre-wrap">{code}</code>
    </pre>
  );
}
