"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import {
  getServerConsent,
  readConsent,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    readConsent,
    getServerConsent,
  );

  // "unknown" = still server-rendered/hydrating, "none" = no choice stored yet.
  const visible = consent === "none";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-kortix-card border border-kortix-border rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-kortix-text-secondary leading-relaxed">
                  We use cookies for analytics so we can understand which pages
                  are useful. Nothing loads until you accept. Read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-kortix-green underline underline-offset-2"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setConsent("declined")}
                  className="px-4 py-2 text-sm font-medium text-kortix-text-secondary hover:text-foreground transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => setConsent("accepted")}
                  className="px-5 py-2 text-sm font-semibold bg-kortix-green text-kortix-darker rounded-lg hover:bg-kortix-green-light transition-all duration-200"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setConsent("declined")}
                  className="p-1.5 text-kortix-muted hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
