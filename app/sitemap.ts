import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://my-portfolio-alpha-ochre-20.vercel.app",
      lastModified: new Date("2026-09-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
