import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import SpecularLink from "@/components/SpecularLink";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { getCohortBySlug } from "@/data/cohorts";
import { getServiceBySlug } from "@/data/services";
import { createPageMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false } };

  // Unpublished outlines stay reachable (so the owner can review and share the
  // plan) but out of the index until real copy replaces the outline.
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: post.published ? "article" : "website",
    index: post.published,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedCohort = post.relatedCohortSlug
    ? getCohortBySlug(post.relatedCohortSlug)
    : undefined;
  const relatedService = post.relatedServiceSlug
    ? getServiceBySlug(post.relatedServiceSlug)
    : undefined;
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      {post.published && <JsonLd data={articleSchema(post)} />}

      <section className="relative pt-32 pb-10 sm:pt-40 sm:pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-kortix-green/5 to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-kortix-green">
              Guide
            </span>
            <span className="text-xs text-kortix-muted">
              Updated <time dateTime={post.updated}>{post.updated}</time>
            </span>
            <span className="text-xs text-kortix-muted">
              Target query: {post.primaryKeyword}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
            {post.title}
          </h1>
          <p className="text-lg text-kortix-text-secondary leading-relaxed">
            {post.description}
          </p>

          {!post.published && (
            <div className="mt-8 p-5 rounded-2xl border border-kortix-green/30 bg-kortix-green/5">
              <p className="text-sm font-semibold text-kortix-green mb-1">
                This guide is still being written
              </p>
              <p className="text-sm text-kortix-text-secondary leading-relaxed">
                Below is the confirmed outline: the sections and questions this
                article will cover once the facts behind it (prices, timelines,
                examples) have been checked. The finished article will replace
                this outline at the same URL.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-8">
            What this article covers
          </h2>
          <ol className="space-y-8">
            {post.outline.map((section, index) => (
              <ScrollReveal key={section.heading} delay={index * 0.03}>
                <li>
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                    <span className="shrink-0 inline-flex w-7 h-7 items-center justify-center rounded-lg bg-kortix-green/10 text-xs font-bold text-kortix-green">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h3>
                  <ul className="space-y-2 pl-10">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-kortix-text-secondary leading-relaxed flex gap-2"
                      >
                        <span className="text-kortix-green" aria-hidden>
                          &bull;
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {relatedCohort && (
              <div className="p-6 rounded-2xl bg-kortix-card border border-kortix-border">
                <h2 className="text-base font-bold text-foreground mb-2">
                  Learn it properly
                </h2>
                <p className="text-sm text-kortix-text-secondary leading-relaxed mb-4">
                  The {relatedCohort.track} cohort runs for{" "}
                  {relatedCohort.duration.toLowerCase()} and costs{" "}
                  {relatedCohort.price}.
                </p>
                <Link
                  href={`/cohorts/${relatedCohort.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-kortix-green hover:text-kortix-green-light transition-colors"
                >
                  {relatedCohort.track} cohort details
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
            {relatedService && (
              <div className="p-6 rounded-2xl bg-kortix-card border border-kortix-border">
                <h2 className="text-base font-bold text-foreground mb-2">
                  Have it built for you
                </h2>
                <p className="text-sm text-kortix-text-secondary leading-relaxed mb-4">
                  {relatedService.pricing}.
                </p>
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-kortix-green hover:text-kortix-green-light transition-colors"
                >
                  {relatedService.title} services
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          <ScrollReveal>
            <h2 className="text-xl font-bold text-foreground mb-6">
              More guides
            </h2>
            <ul className="space-y-3 mb-10">
              {otherPosts.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="block p-5 rounded-xl bg-kortix-card border border-kortix-border hover:border-kortix-green/30 transition-colors"
                  >
                    <span className="block text-sm font-semibold text-foreground mb-1">
                      {other.title}
                    </span>
                    <span className="block text-sm text-kortix-muted">
                      {other.primaryKeyword}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center">
              <SpecularLink href="/contact" size="md">
                Ask us a question
                <ArrowRight size={16} />
              </SpecularLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
