import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { cohorts } from "@/data/cohorts";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative pt-32 pb-24 sm:pt-40">
      <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-kortix-green mb-4">
          Error 404
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-kortix-text-secondary text-lg mb-10 max-w-xl mx-auto">
          The link may be outdated or mistyped. Here are the most useful places
          to continue from.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-kortix-green text-kortix-darker font-semibold text-sm hover:bg-kortix-green-light transition-colors"
          >
            Back to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-kortix-border text-foreground font-semibold text-sm hover:border-kortix-green/40 transition-colors"
          >
            Contact us
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Services</h2>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-kortix-muted hover:text-kortix-green transition-colors"
                  >
                    {service.title} services
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Cohorts</h2>
            <ul className="space-y-2.5">
              {cohorts.map((cohort) => (
                <li key={cohort.slug}>
                  <Link
                    href={`/cohorts/${cohort.slug}`}
                    className="text-sm text-kortix-muted hover:text-kortix-green transition-colors"
                  >
                    {cohort.track} cohort
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
