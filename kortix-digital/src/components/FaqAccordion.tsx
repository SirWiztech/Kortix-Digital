import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";
import { faqSchema, type FaqItem } from "@/lib/schema";

/**
 * Server-rendered FAQ accordion built on <details>/<summary>.
 *
 * Every answer is present in the initial HTML (no click required for the text
 * to exist), which is what the FAQPage markup below requires, and it costs no
 * client JavaScript to open and close.
 */
export default function FaqAccordion({
  items,
  withSchema = true,
  className = "",
}: {
  items: FaqItem[];
  /** Set false when the parent page emits its own FAQPage markup. */
  withSchema?: boolean;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {withSchema && <JsonLd data={faqSchema(items)} />}
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-kortix-border bg-kortix-card transition-colors open:border-kortix-green/30 hover:border-kortix-green/20"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              {item.question}
            </h3>
            <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-kortix-border text-kortix-green transition-all duration-300 group-open:rotate-180 group-open:bg-kortix-green group-open:text-kortix-darker group-open:border-kortix-green">
              <ChevronDown size={18} />
            </span>
          </summary>
          <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-kortix-text-secondary text-sm sm:text-base leading-relaxed">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
