import {
  Code,
  Smartphone,
  Shield,
  BarChart3,
  Megaphone,
  PenTool,
  Video,
  Link2,
  Pen,
  Globe,
  Palette,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Smartphone,
  Shield,
  BarChart3,
  Megaphone,
  PenTool,
  Video,
  Link2,
  Pen,
  Globe,
  Palette,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code;
}
