"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/cohorts", label: "Cohorts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-kortix-darker/90 backdrop-blur-xl border-b border-kortix-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/Kortix Favicon .png"
              alt="Kortix Digital"
              width={32}
              height={32}
              className="transition-all duration-300"
              preload={true}
            />
            <span className="text-lg font-bold text-foreground">
              Kortix<span className="text-kortix-green-light"> Digital</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive
                      ? "text-kortix-green"
                      : "text-kortix-text-secondary hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-kortix-green rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-kortix-text-secondary hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/request"
              className="px-5 py-2.5 bg-kortix-green hover:bg-kortix-green-light text-kortix-darker font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-kortix-green/20"
            >
              Request a Service
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-kortix-text-secondary hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-kortix-darker/95 backdrop-blur-xl border-b border-kortix-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-kortix-green bg-kortix-green/10"
                        : "text-kortix-text-secondary hover:text-foreground hover:bg-foreground/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-kortix-text-secondary hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              <Link
                href="/request"
                onClick={closeMobile}
                className="block w-full px-4 py-3 bg-kortix-green text-kortix-darker font-semibold text-sm rounded-lg text-center mt-3"
              >
                Request a Service
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
