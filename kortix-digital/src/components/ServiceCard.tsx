"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { type Service } from "@/data/services";
import { getIcon } from "@/lib/icon-map";
import ElectricBorder from "./ui/ElectricBorder";

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = getIcon(service.iconName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <ElectricBorder borderRadius={16} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group block h-full p-6 sm:p-8 rounded-2xl bg-kortix-card transition-all duration-300 hover:shadow-lg hover:shadow-kortix-green/5 hover:-translate-y-1"
      >
        <div className="w-12 h-12 rounded-xl bg-kortix-green/10 flex items-center justify-center mb-5 group-hover:bg-kortix-green/20 transition-colors">
          <Icon size={24} className="text-kortix-green" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-kortix-green transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-kortix-text-secondary leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-kortix-green">
          Request Quote
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </Link>
      </ElectricBorder>
    </motion.div>
  );
}
