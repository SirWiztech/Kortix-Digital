import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import SpecularLink from "@/components/SpecularLink";
import { blogPosts } from "@/data/blog";
import { cohorts } from "@/data/cohorts";
import { services } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { ArrowRight } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Guides & Articles",
  description:
    "Practical guides on starting a tech career in Nigeria, learning web development and pricing a website — written by the Kortix Digital team.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Blog", path: "/blog" },
              ]}
            />
          </div>
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Guides &amp; Articles
            </h1>
            <p className="text-kortix-text-secondary text-lg max-w-2xl mx-auto">
              Straight answers about learning a digital skill in Nigeria and
              hiring someone to build for you — no hype, no inflated promises.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ul className="space-y-6">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 sm:p-8 rounded-2xl bg-kortix-card border border-kortix-border hover:border-kortix-green/30 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-kortix-green">
                      Guide
                    </span>
                    {!post.published && (
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-kortix-border text-kortix-muted">
                        In progress
                      </span>
                    )}
                    <span className="text-xs text-kortix-muted">
                      Updated{" "}
                      <time dateTime={post.updated}>{post.updated}</time>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-kortix-green transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-kortix-text-secondary leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-kortix-green">
                    Read the outline
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ScrollReveal>
            <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-kortix-card border border-kortix-border">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Looking for something specific?
              </h2>
              <p className="text-sm text-kortix-text-secondary leading-relaxed mb-6">
                These guides sit alongside the two things we actually do: build
                software for businesses, and train people to build it
                themselves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SpecularLink href="/cohorts" size="md">
                  See all {cohorts.length} cohorts
                  <ArrowRight size={16} />
                </SpecularLink>
                <SpecularLink
                  href="/services"
                  size="md"
                  baseColor="#0a0a0a"
                  thickness={0.5}
                >
                  See all {services.length} services
                </SpecularLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
