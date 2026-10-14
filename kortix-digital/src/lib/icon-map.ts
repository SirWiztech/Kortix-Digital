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

/**
 * Static lookup of icon components by the `iconName` stored in the data files.
 * Kept as a plain record (instead of a `getIcon()` function) so components are
 * never *created* during render — that would reset their state on every render.
 */
export const icons: Record<string, LucideIcon> = {
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

export const fallbackIcon: LucideIcon = Code;
