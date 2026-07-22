import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Graphic Design", href: "/services/graphic-design" },
    { label: "Video Editing", href: "/services/video-editing" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "App Development", href: "/services/app-development" },
  ],
  cohorts: [
    { label: "Web Development", href: "/cohorts/web-development" },
    { label: "App Development", href: "/cohorts/app-development" },
    { label: "Data Analysis", href: "/cohorts/data-analysis" },
    { label: "Cybersecurity", href: "/cohorts/cybersecurity" },
    { label: "UI/UX Design", href: "/cohorts/ui-ux-design" },
    { label: "Digital Marketing", href: "/cohorts/digital-marketing" },
    { label: "Content Creation", href: "/cohorts/content-creation" },
    { label: "Video Editing", href: "/cohorts/video-editing" },
    { label: "Web3", href: "/cohorts/web3" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Service", href: "/request" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-kortix-darker border-t border-kortix-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2">
              <Image
                src="/Kortix Favicon .png"
                alt="Kortix Digital"
                width={28}
                height={28}
                preload={true}
              />
              <span className="text-lg font-bold text-foreground">
                Kortix<span className="text-kortix-green-light"> Digital</span>
              </span>
            </Link>
            <p className="text-sm text-kortix-muted leading-relaxed mb-6">
              Digital agency services and mentorship cohorts for the next generation.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/2347071617216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-kortix-text-secondary hover:text-kortix-whatsapp transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="https://discordapp.com/users/1466951307708469516"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-kortix-text-secondary hover:text-kortix-discord transition-colors"
              >
                <ExternalLink size={16} />
                Discord
              </a>
              <a
                href="mailto:kortixdigital@gmail.com"
                className="flex items-center gap-2 text-sm text-kortix-text-secondary hover:text-kortix-green transition-colors"
              >
                <Mail size={16} />
                kortixdigital@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-kortix-muted hover:text-kortix-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Cohorts
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.cohorts.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-kortix-muted hover:text-kortix-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-kortix-muted hover:text-kortix-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-kortix-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-kortix-muted">
            &copy; {new Date().getFullYear()} Kortix Digital. All rights reserved.
          </p>
          <p className="text-xs text-kortix-muted">
            We Build. We Teach. We Transform.
          </p>
        </div>
      </div>

      <div className="pointer-events-none select-none w-full flex justify-center">
        <h2
          className="text-[14vw] leading-none font-black tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-kortix-text-secondary/20 to-kortix-darker"
          style={{ WebkitTextStroke: "0px transparent" }}
        >
          KORTIX DIGITAL
        </h2>
      </div>
    </footer>
  );
}