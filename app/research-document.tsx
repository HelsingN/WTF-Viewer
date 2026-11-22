import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { targetLink } from "@/lib/research-package";
import type { ResearchPackage } from "@/lib/research-package";

export function publicUrl(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function ResearchDocument({ pack, path, open, unavailable, text }: {
  pack: ResearchPackage;
  path: string;
  open: (path: string) => void;
  unavailable: string;
  text: string;
}) {
  const links = new Map(pack.original.get(path)?.links.map(edge => [edge.link, edge]));
  return <div className="research-markdown"><Markdown skipHtml remarkPlugins={[remarkGfm]}
    urlTransform={url => url}
    components={{
      img: ({ alt }) => alt ? <span>{alt}</span> : null,
      a: ({ href = "", children }) => {
        const edge = links.get(href);
        if (edge?.resolution === "target" && pack.entries.has(edge.target_path)) {
          if (edge.fragment) {
            return <a href={targetLink(pack.manifest.target.commit, edge.target_path) + "#" + encodeURIComponent(edge.fragment.replace(/^#/, ""))}
              target="_blank" rel="noreferrer">{children}</a>;
          }
          return <button type="button" className="research-inline-link" onClick={() => open(edge.target_path)}>{children}</button>;
        }
        if (!edge && href.startsWith("#") && href.length > 1) {
          return <a href={targetLink(pack.manifest.target.commit, path) + "#" + encodeURIComponent(href.slice(1))}
            target="_blank" rel="noreferrer">{children}</a>;
        }
        const destination = edge?.resolution === "source_archive" ? publicUrl(edge.source_url)
          : edge ? undefined : publicUrl(href);
        return destination ? <a href={destination} target="_blank" rel="noreferrer">{children}</a>
          : <span title={unavailable}>{children} <small>({unavailable})</small></span>;
      },
      table: ({ children }) => <div className="research-table-scroll" tabIndex={0}><table>{children}</table></div>,
    }}>{text}</Markdown></div>;
}
