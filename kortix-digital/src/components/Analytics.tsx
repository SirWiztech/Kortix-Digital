"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import {
  getServerConsent,
  readConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * Google Analytics 4, loaded only after the visitor accepts cookies.
 *
 * There is no "load with consent denied" path: with no consent the tag is never
 * requested, so nothing is collected. The measurement ID comes from
 * NEXT_PUBLIC_GA_MEASUREMENT_ID (see .env.example); when it is unset this
 * component renders nothing at all.
 *
 * TODO(owner): set NEXT_PUBLIC_GA_MEASUREMENT_ID, then verify in GA4 Realtime
 * that `generate_lead`, `click_whatsapp` and `join_cohort_click` arrive.
 */
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function Analytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    getServerConsent,
  );

  if (!MEASUREMENT_ID || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
