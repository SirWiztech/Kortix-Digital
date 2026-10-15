import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD, so the
 * markup can never drift from what users see.
 *
 * `items` must include the Home entry first and the current page last.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-kortix-muted">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    aria-hidden
                    className="text-kortix-border"
                  />
                )}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="text-kortix-text-secondary"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-kortix-green transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
