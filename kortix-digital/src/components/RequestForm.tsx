"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { services } from "@/data/services";
import {
  HONEYPOT_FIELD,
  REQUEST_CURRENCIES,
  requestServiceSchema,
  type RequestServiceInput,
} from "@/lib/request-schema";
import { trackEvent } from "@/lib/analytics";
import SpecularButton from "./ui/SpecularButton";

const currencies = REQUEST_CURRENCIES;

// Validation rules live in lib/request-schema.ts and are shared with the API
// route, so the browser and the server can never disagree about what is valid.
type FormData = RequestServiceInput;

/**
 * The /request page receives a service *slug* in the query string
 * (?service=graphic-design) while the select is keyed by service title. Match
 * either, otherwise the preselection silently does nothing.
 */
function initialService(value?: string): string {
  if (!value) return "";
  const match = services.find(
    (service) => service.slug === value || service.title === value,
  );
  return match?.title ?? "";
}

export default function RequestForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(requestServiceSchema),
    defaultValues: {
      service: initialService(defaultService),
      currency: "NGN",
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMessage(payload?.error ?? null);
        throw new Error("Request failed");
      }
      // Primary conversion. Consent-gated: fires nothing unless GA4 is loaded.
      trackEvent("generate_lead", {
        service: data.service,
        currency: data.currency ?? "NGN",
        currency_value: data.budget ? Number(data.budget) : 0,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <CheckCircle size={48} className="text-kortix-green mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Request Submitted!</h3>
        <p className="text-kortix-text-secondary">
          We&apos;ll get back to you within 24 hours. Check your email for a confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/*
        Honeypot. Hidden from sighted users and from assistive tech, and never
        focusable, but a script that blindly fills every input will complete it
        — and the API silently discards any submission that arrives with it
        filled.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(HONEYPOT_FIELD)}
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-kortix-text-secondary mb-2">
          Service Type
        </label>
        <select
          id="service"
          {...register("service")}
          className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1.5 text-sm text-red-400">{errors.service.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-kortix-text-secondary mb-2">
            Currency
          </label>
          <select
            id="currency"
            {...register("currency")}
            className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.currency && (
            <p className="mt-1.5 text-sm text-red-400">{errors.currency.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-kortix-text-secondary mb-2">
            Proposed Budget
          </label>
          <input
            id="budget"
            type="number"
            placeholder="e.g. 50000"
            {...register("budget")}
            className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground placeholder:text-kortix-muted focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-kortix-text-secondary mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground placeholder:text-kortix-muted focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors"
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-kortix-text-secondary mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground placeholder:text-kortix-muted focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors"
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-kortix-text-secondary mb-2">
          Project Details
        </label>
        <textarea
          id="details"
          rows={5}
          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
          {...register("details")}
          className="w-full px-4 py-3 bg-kortix-dark border border-kortix-border rounded-xl text-foreground placeholder:text-kortix-muted focus:outline-none focus:border-kortix-green focus:ring-1 focus:ring-kortix-green transition-colors resize-none"
        />
        {errors.details && (
          <p className="mt-1.5 text-sm text-red-400">{errors.details.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-400">
            {errorMessage ??
              "Something went wrong. Please try again or email us directly at kortixdigital@gmail.com"}
          </p>
        </div>
      )}

      <SpecularButton
        as="button"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Request
          </>
        )}
      </SpecularButton>
    </form>
  );
}
