export interface Service {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  iconName: string;
  pricing: string;
}

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for speed, scalability, and stunning design.",
    longDescription:
      "From landing pages to full-stack web applications, we craft digital experiences that convert visitors into customers. Our team uses cutting-edge technologies like React, Next.js, and Node.js to build fast, secure, and scalable solutions tailored to your business goals.",
    features: [
      "Responsive design for all devices",
      "SEO-optimized architecture",
      "Performance-first development",
      "Custom CMS integrations",
      "E-commerce solutions",
      "API development & integration",
    ],
    iconName: "Globe",
    pricing: "Frontend from ₦50,000 · Backend from ₦50,000 · Full Stack from ₦100,000",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description:
      "Visual identities, brand systems, and marketing materials that make your brand unforgettable.",
    longDescription:
      "Great design is more than aesthetics — it's strategic communication. We create brand identities, marketing collateral, social media assets, and print materials that resonate with your audience and elevate your brand perception.",
    features: [
      "Logo & brand identity design",
      "Marketing collateral",
      "Social media graphics",
      "Print design (flyers, banners, brochures)",
      "Brand guideline documentation",
      "Packaging design",
    ],
    iconName: "Palette",
    pricing: "Contact for pricing",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description:
      "Professional video editing, motion graphics, and post-production that brings your stories to life.",
    longDescription:
      "From social media reels to full-length promotional videos, we handle all aspects of post-production. Our editors craft compelling narratives with smooth transitions, color grading, sound design, and motion graphics that captivate audiences.",
    features: [
      "Social media reels & shorts",
      "Promotional & explainer videos",
      "Color grading & correction",
      "Sound design & mixing",
      "Motion graphics & VFX",
      "YouTube content editing",
    ],
    iconName: "Video",
    pricing: "Contact for pricing",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User-centered design that transforms complex problems into intuitive, beautiful digital experiences.",
    longDescription:
      "We design interfaces that users love. Through research-driven UX strategy and pixel-perfect UI design, we create digital products that are not only visually stunning but also intuitive and accessible. From wireframes to high-fidelity prototypes, every interaction is crafted with purpose.",
    features: [
      "User research & persona development",
      "Wireframing & prototyping",
      "UI design systems",
      "Usability testing",
      "Interaction design",
      "Accessibility compliance",
    ],
    iconName: "PenTool",
    pricing: "Contact for pricing",
  },
  {
    slug: "app-development",
    title: "App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android.",
    longDescription:
      "We build mobile applications that users love to use. Whether you need a native iOS/Android app or a cross-platform solution with React Native or Flutter, our team delivers high-performance apps with beautiful interfaces and robust backend systems.",
    features: [
      "iOS & Android native development",
      "Cross-platform (React Native / Flutter)",
      "Backend API development",
      "Push notifications",
      "App Store submission",
      "Post-launch maintenance",
    ],
    iconName: "Smartphone",
    pricing: "Contact for pricing",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
