import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

export function HTMLParser({ html }: { html: string }) {
  const sanitized = sanitizeHtml(html);
  const parsed = parse(sanitized);
  return parsed;
}
