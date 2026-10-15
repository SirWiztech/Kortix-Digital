"use client";

import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Clock, Users } from "lucide-react";
import { type Cohort } from "@/data/cohorts";
import { fallbackIcon, icons } from "@/lib/icon-map";
import { trackEvent } from "@/lib/analytics";
import SpecularButton from "./ui/SpecularButton";
import ElectricBorder from "./ui/ElectricBorder";

export default function CohortCard({
  cohort,
  index = 0,
}: {
  cohort: Cohort;
  index?: number;
}) {
  const Icon = icons[cohort.iconName] ?? fallbackIcon;
  const isPlaceholder = cohort.whatsappLink === "#";

  return (
    // CSS-based reveal: the card is visible in the server HTML and without
    // JavaScript, and only animates once scripting is running.
    <ScrollReveal delay={index * 0.08} className="h-full">
      <ElectricBorder borderRadius={16} className="h-full">
      <div className="group h-full p-6 sm:p-8 rounded-2xl bg-kortix-card transition-all duration-300 hover:shadow-lg hover:shadow-kortix-green/5 flex flex-col hover:-translate-y-1">
        <div className="w-12 h-12 rounded-xl bg-kortix-green/10 flex items-center justify-center mb-5">
          <Icon size={24} className="text-kortix-green" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{cohort.track}</h3>

        <p className="text-sm text-kortix-text-secondary leading-relaxed mb-5 flex-1">
          {cohort.description}
        </p>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-sm text-kortix-muted">
            <Clock size={14} />
            {cohort.duration}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl font-bold text-kortix-green">
            {cohort.price}
          </span>
          <span className="text-base font-medium text-kortix-muted line-through">
            {cohort.originalPrice}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {isPlaceholder ? (
            <div className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold bg-kortix-border text-kortix-muted cursor-not-allowed">
              <Users size={16} />
              Link Coming Soon
            </div>
          ) : (
            <SpecularButton
              as="a"
              href={cohort.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="w-full"
              radius={8}
              lineColor="#25D366"
              aria-label={`Join the ${cohort.track} cohort WhatsApp group`}
              onClick={() => {
                trackEvent("join_cohort_click", { cohort: cohort.track });
                trackEvent("click_whatsapp", { location: "cohort_card" });
              }}
            >
              <Users size={16} />
              Join WhatsApp Group
            </SpecularButton>
          )}

          {/* Visible text stays short; the accessible name spells out which
              cohort is on the other end, so nine cards do not read as nine
              identical "Cohort details" links. */}
          <SpecularButton
            as="a"
            href={`/cohorts/${cohort.slug}`}
            size="sm"
            className="w-full"
            radius={8}
            baseColor="#0a0a0a"
            thickness={0.5}
            aria-label={`${cohort.track} cohort details: ${cohort.duration}, curriculum and fees`}
          >
            {cohort.track} cohort details
            <ArrowRight size={14} />
          </SpecularButton>
        </div>
      </div>
      </ElectricBorder>
    </ScrollReveal>
  );
}
