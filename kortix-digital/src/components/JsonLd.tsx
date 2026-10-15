import type { SchemaNode } from "@/lib/schema";

/**
 * Renders JSON-LD in a Server Component. `<` is escaped as `\u003c` so a
 * string inside the data can never close the script tag early.
 */
export default function JsonLd({
  data,
}: {
  data: SchemaNode | SchemaNode[];
}) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
