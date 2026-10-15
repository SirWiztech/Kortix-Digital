import Breadcrumbs from "./Breadcrumbs";
import { SITE_CONTENT_UPDATED } from "@/lib/site";

export interface LegalSection {
  heading: string;
  /** Paragraphs of plain-English policy text. */
  body: string[];
}

/**
 * Shared layout for the legal pages (privacy, terms, refunds).
 *
 * IMPORTANT: the copy on these pages only describes what this website
 * actually does today. Every page carries a visible review notice because the
 * wording still needs to be signed off by the business owner (and, ideally, a
 * lawyer) before it should be treated as a binding policy.
 * TODO(owner): review and finalise all three documents, then remove the notice
 * by setting `reviewNotice={false}` on the page.
 */
export default function LegalDoc({
  title,
  intro,
  sections,
  path,
  reviewNotice = true,
  notice,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Path of this page, used for the breadcrumb trail and its JSON-LD. */
  path: string;
  reviewNotice?: boolean;
  notice?: string;
}) {
  return (
    <>
      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: title, path },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-kortix-text-secondary leading-relaxed">{intro}</p>
          <p className="mt-3 text-sm text-kortix-muted">
            Last updated{" "}
            <time dateTime={SITE_CONTENT_UPDATED}>{SITE_CONTENT_UPDATED}</time>
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {reviewNotice && (
            <div className="mb-10 p-5 rounded-2xl border border-kortix-green/30 bg-kortix-green/5">
              <p className="text-sm font-semibold text-kortix-green mb-1">
                Awaiting final review
              </p>
              <p className="text-sm text-kortix-text-secondary leading-relaxed">
                {notice ??
                  "This page describes how Kortix Digital actually operates today. It has not yet been reviewed by a lawyer, so treat it as a plain-English summary rather than a binding legal document."}
              </p>
            </div>
          )}

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-foreground mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm sm:text-base text-kortix-text-secondary leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
