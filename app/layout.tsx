import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-kiran-gauthams-projects.vercel.app"),
  title: {
    default: "Kiran Gautham | Full Stack, AI/ML & Cybersecurity Developer",
    template: "%s | Kiran Gautham",
  },
  description:
    "Premium developer portfolio for Kiran Gautham, a full-stack engineer focused on AI/ML, cybersecurity, real-time systems, React, Next.js, Node.js, Python, FastAPI, and scalable product engineering.",
  keywords: [
    "Kiran Gautham",
    "Full Stack Developer",
    "AI ML Developer",
    "Cybersecurity",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "FastAPI",
    "Real-Time Systems",
    "Portfolio",
  ],
  authors: [{ name: "Kiran Gautham", url: "https://github.com/kirangautham-82899" }],
  creator: "Kiran Gautham",
  openGraph: {
    title: "Kiran Gautham | Full Stack, AI/ML & Cybersecurity Developer",
    description:
      "Award-grade animated portfolio showcasing full-stack engineering, real-time systems, AI/ML, cybersecurity projects, research, achievements, and leadership.",
    url: "https://my-portfolio-kiran-gauthams-projects.vercel.app",
    siteName: "Kiran Gautham Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiran Gautham portfolio preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran Gautham | Full Stack, AI/ML & Cybersecurity Developer",
    description:
      "Full-stack, AI/ML, cybersecurity, and real-time systems portfolio with cinematic interactive engineering case studies.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
