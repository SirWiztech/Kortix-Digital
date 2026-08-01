"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MessageCircle, Sparkles, X, Send } from "lucide-react";
import { WhatsAppIcon } from "./BrandIcons";
import { respondToMessage, WHATSAPP_LINK } from "@/lib/chatbot-engine";

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
}

let messageId = 0;

function makeMessage(role: "bot" | "user", text: string): ChatMessage {
  return { id: ++messageId, role, text };
}

const QUICK_REPLIES = [
  { label: "Explore Services", href: "/services", prompt: "What services do you offer?" },
  { label: "Join a Cohort", href: "/cohorts", prompt: "What cohorts do you have?" },
  { label: "Check Prices", href: null as string | null, prompt: "What are your prices?" },
  { label: "How do cohorts work?", href: null as string | null, prompt: "How do cohorts work?" },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  makeMessage(
    "bot",
    "Hey there! 👋 Welcome to Kortix Digital. Ask me about our services, cohorts, pricing, or how to get started — or tap a quick option below."
  ),
];

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      makeMessage("user", trimmed),
      makeMessage("bot", respondToMessage(trimmed)),
    ]);
    setInput("");
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[14rem] right-6 origin-bottom-right w-[min(22rem,calc(100vw-3rem))] rounded-2xl overflow-hidden bg-kortix-darker border border-kortix-border shadow-2xl shadow-black/50 z-50 flex flex-col max-h-[calc(100dvh-16rem)]"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-kortix-card border-b border-kortix-border">
              <div className="relative w-9 h-9 rounded-full bg-kortix-green/10 border border-kortix-green/30 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-kortix-green" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-kortix-green animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Kortix Assistant
                </p>
                <p className="text-xs text-kortix-green">Online — replies instantly</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="p-1.5 text-kortix-muted hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 min-h-0 px-4 py-4 space-y-3 overflow-y-auto"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                      msg.role === "user"
                        ? "bg-kortix-green text-kortix-darker rounded-br-sm"
                        : "bg-kortix-card border border-kortix-border text-kortix-text-secondary rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((reply) =>
                  reply.href ? (
                    <Link
                      key={reply.label}
                      href={reply.href}
                      onClick={() => sendMessage(reply.prompt)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-kortix-green/10 text-kortix-green border border-kortix-green/20 hover:bg-kortix-green hover:text-kortix-darker transition-all duration-200"
                    >
                      {reply.label}
                    </Link>
                  ) : (
                    <button
                      key={reply.label}
                      type="button"
                      onClick={() => sendMessage(reply.prompt)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-kortix-green/10 text-kortix-green border border-kortix-green/20 hover:bg-kortix-green hover:text-kortix-darker transition-all duration-200"
                    >
                      {reply.label}
                    </button>
                  )
                )}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendMessage("Talk to a human")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-kortix-whatsapp/15 text-kortix-whatsapp border border-kortix-whatsapp/30 hover:bg-kortix-whatsapp hover:text-white transition-all duration-200"
                >
                  <WhatsAppIcon size={12} />
                  Talk to a human
                </a>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-kortix-border"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 min-w-0 bg-kortix-card border border-kortix-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-kortix-muted focus:outline-none focus:border-kortix-green/50 transition-colors"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="shrink-0 w-10 h-10 rounded-full bg-kortix-green text-kortix-darker flex items-center justify-center hover:bg-kortix-green-light transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-kortix-green text-kortix-darker shadow-lg shadow-kortix-green/30"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
        <motion.span
          aria-hidden
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-kortix-green"
          style={{ zIndex: -1 }}
        />
      </motion.button>
    </div>
  );
}
