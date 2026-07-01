import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://my-portfolio-kiran-gauthams-projects.vercel.app/sitemap.xml",
  };
}
