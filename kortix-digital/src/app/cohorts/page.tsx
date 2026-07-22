import type { Metadata } from "next";
import CohortCard from "@/components/CohortCard";
import ScrollReveal from "@/components/ScrollReveal";
import BrandPatternSection from "@/components/BrandPatternSection";
import { cohorts } from "@/data/cohorts";

export const metadata: Metadata = {
  title: "Cohorts",
  description:
    "Intensive mentorship cohorts in 9 digital skill tracks — web development, app development, cybersecurity, data analysis, UI/UX, digital marketing, content creation, video editing, and web3.",
};

export default function CohortsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Master Digital Skills
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              Choose from 9 specialized tracks. Each cohort includes hands-on
              projects, expert mentorship, and a community of learners.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <BrandPatternSection className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cohorts.map((cohort, i) => (
              <CohortCard key={cohort.slug} cohort={cohort} index={i} />
            ))}
          </div>
        </div>
      </BrandPatternSection>
    </>
  );
}
