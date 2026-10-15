"use client";

import { motion } from "motion/react";
import { WhatsAppIcon, DiscordIcon } from "./BrandIcons";
import TrackedLink from "./TrackedLink";
import { WHATSAPP_URL, DISCORD_URL } from "@/lib/site";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex flex-col gap-3"
    >
      <TrackedLink
        href={WHATSAPP_URL}
        event="click_whatsapp"
        params={{ location: "floating_button" }}
        target="_blank"
        rel="noopener noreferrer"
        ariaLabel="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-kortix-whatsapp shadow-lg shadow-kortix-whatsapp/20 hover:shadow-kortix-whatsapp/40 hover:scale-110 transition-all duration-200"
      >
        <WhatsAppIcon size={24} className="text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-kortix-card text-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-kortix-border">
          Chat with us
        </span>
      </TrackedLink>

      <TrackedLink
        href={DISCORD_URL}
        event="click_discord"
        params={{ location: "floating_button" }}
        target="_blank"
        rel="noopener noreferrer"
        ariaLabel="Join Discord"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-kortix-discord shadow-lg shadow-kortix-discord/20 hover:shadow-kortix-discord/40 hover:scale-110 transition-all duration-200"
      >
        <DiscordIcon size={24} className="text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-kortix-card text-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-kortix-border">
          Join Discord
        </span>
      </TrackedLink>
    </motion.div>
  );
}
