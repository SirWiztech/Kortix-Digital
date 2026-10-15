import CohortCard from "@/components/CohortCard";
import ScrollReveal from "@/components/ScrollReveal";
import BrandPatternSection from "@/components/BrandPatternSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cohorts } from "@/data/cohorts";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Tech Skills Cohorts in Nigeria (9 Tracks)",
  description:
    "Mentorship cohorts with live lessons, projects and mentor support in web development, app development, cybersecurity, data analysis, UI/UX, marketing and more.",
  path: "/cohorts",
});

export default function CohortsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Cohorts", path: "/cohorts" },
              ]}
            />
          </div>
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
