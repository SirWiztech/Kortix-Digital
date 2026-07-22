"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

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
                  We use cookies to enhance your browsing experience, analyze site traffic,
                  and personalize content. By continuing, you agree to our use of cookies.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={decline}
                  className="px-4 py-2 text-sm font-medium text-kortix-text-secondary hover:text-foreground transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 text-sm font-semibold bg-kortix-green text-kortix-darker rounded-lg hover:bg-kortix-green-light transition-all duration-200"
                >
                  Accept All
                </button>
                <button
                  onClick={decline}
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
