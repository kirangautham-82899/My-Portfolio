import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kiran-gautham.vercel.app",
      lastModified: new Date("2026-06-30"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
