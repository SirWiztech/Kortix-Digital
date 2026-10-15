"use client";

import SpecularLink from "./SpecularLink";
import { Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * The "join this cohort" CTA for cohort pages.
 *
 * Kept as its own client component so the cohort page itself can stay a Server
 * Component while the click still reports `join_cohort_click` (with the track
 * name) and `click_whatsapp`.
 *
 * Cohorts whose WhatsApp invite is not published render a disabled state
 * instead — no link, no event, and no pretending enrollment is open.
 */
export default function JoinCohortButton({
  cohortTrack,
  whatsappLink,
  size = "lg",
  className,
}: {
  cohortTrack: string;
  /** "#" means the invite has not been published for this track yet. */
  whatsappLink: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (whatsappLink === "#") {
    return (
      <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-kortix-border text-kortix-muted cursor-not-allowed">
        <Users size={20} />
        WhatsApp Link Coming Soon
      </div>
    );
  }

  return (
    <SpecularLink
      href={whatsappLink}
      size={size}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      lineColor="#25D366"
      aria-label={`Join the ${cohortTrack} cohort WhatsApp group`}
      onClick={() => {
        trackEvent("join_cohort_click", { cohort: cohortTrack });
        trackEvent("click_whatsapp", { location: "cohort_page" });
      }}
    >
      <Users size={20} />
      Join WhatsApp Group
    </SpecularLink>
  );
}
