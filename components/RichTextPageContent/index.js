import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import LinkIcon from "./svg/LinkIcon";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function slugifyString(string) {
  return string
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase();
}

const DynamicCodeBlock = dynamic(() => import("./CodeBlock"));

const DynamicVideoEmbed = dynamic(() => import("./VideoEmbed"));

export function getRichTextRenderOptions(links, options) {
  const { renderH2Links, renderNativeImg } = options;

  const assetBlockMap = new Map(
    links?.assets?.block?.map((asset) => [asset.sys.id, asset]),
  );

  const entryMap = new Map();
  // loop through the block linked entries and add them to the map
  if (links.entries.block) {
    for (const entry of links.entries.block) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  // loop through the inline linked entries and add them to the map
  if (links.entries.inline) {
    for (const entry of links.entries.inline) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <b>
          {text}
        </b>
      ),
      [MARKS.CODE]: (text) => (
        <code>{text}</code>
      ),
    },

    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="nofollow noreferrer"
        >
          {children}
        </a>
      ),
      [BLOCKS.HR]: (text) => (
        <hr />
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-4xl">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        if (renderH2Links) {
          return (
            <div className="mt-8 mb-4">
              <h2
                id={`${slugifyString(children[0])}`}
              >
                {children}
              </h2>
              <a
                href={`#${slugifyString(children[0])}`}
                aria-label={children}
              >
                <LinkIcon />
              </a>
            </div>
          );
        } else {
          return <h2 className="mt-8 mb-4">{children}</h2>;
        }
      },
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6>{children}</h6>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4">{children}</p>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote>
          {children}
        </blockquote>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc my-6 mx-0 pl-8">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className=" list-decimal my-6 mx-0 pl-8">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-2">
          {children}
        </li>
      ),
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "BlogPost":
            return (
              <Link href={`/blog/${entry.slug}`}>
                <a>{entry.title}</a>
              </Link>
            );
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const entry = entryMap.get(node.data.target.sys.id);
        const { __typename } = entry;

        switch (__typename) {
          case "VideoEmbed":
            const { embedUrl, title } = entry;
            return <DynamicVideoEmbed embedUrl={embedUrl} title={title} />;
          case "CodeBlock":
            const { language, code } = entry;

            return <DynamicCodeBlock language={language} code={code} />;
          default:
            return null;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        const { title, url, height, width, description } = assetBlockMap.get(
          node.data.target.sys.id,
        );

        if (renderNativeImg) {
          return (
            <figure className="my-6">
              <img src={url} alt={description} height={height} width={width} />
              <figcaption className="mt-3 text-zinc-500">{description}</figcaption>
            </figure>
          );
        } else {
          return (
            <figure className="my-6">
              <Image
                src={url}
                alt={description}
                height={height}
                width={width}
                layout="responsive"
              />
              <figcaption className="mt-3 text-zinc-500">{description}</figcaption>
            </figure>
          );
        }
      },
    },
  };
}

export default function RichTextPageContent(props) {
  const { richTextBodyField, renderH2Links } = props;

  return (
    <div>
      {documentToReactComponents(
        richTextBodyField.json,
        getRichTextRenderOptions(richTextBodyField.links, { renderH2Links }),
      )}
    </div>
  );
}
