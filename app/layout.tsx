import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_URL = "https://my-portfolio-alpha-ochre-20.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kiran Gautham | Software Engineer — Full Stack, AI/ML & Cybersecurity",
    template: "%s | Kiran Gautham",
  },
  description:
    "Kiran Gautham — Software Engineer at Sustains.ai. Full-stack developer in React, Next.js, Node.js, Python, AI/ML & cybersecurity. 15+ hackathon wins.",
  keywords: [
    "Kiran Gautham",
    "Kiran Gautham portfolio",
    "Kiran Gautham developer",
    "Kiran Gautham software engineer",
    "Full Stack Developer",
    "Software Engineer Sustains.ai",
    "AI ML Developer India",
    "Cybersecurity Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",
    "FastAPI",
    "Palakkad developer",
    "Kerala software engineer",
    "Amrita Vishwa Vidyapeetham",
    "Ahalia School of Engineering",
    "portfolio",
  ],
  authors: [{ name: "Kiran Gautham", url: "https://github.com/kirangautham-82899" }],
  creator: "Kiran Gautham",
  publisher: "Kiran Gautham",
  openGraph: {
    title: "Kiran Gautham | Software Engineer — Full Stack, AI/ML & Cybersecurity",
    description:
      "Kiran Gautham — Software Engineer at Sustains.ai. Full-stack developer, AI/ML researcher, cybersecurity builder. 15+ hackathon wins, published research, B.Tech CSE 2026.",
    url: SITE_URL,
    siteName: "Kiran Gautham",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiran Gautham — Software Engineer portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran Gautham | Software Engineer — Full Stack, AI/ML & Cybersecurity",
    description:
      "Kiran Gautham — Software Engineer at Sustains.ai. Full-stack, AI/ML, cybersecurity, real-time systems.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Kiran Gautham",
    givenName: "Kiran",
    familyName: "Gautham",
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Sustains.ai Financial Solutions LLP",
      url: "https://sustains.ai",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Ahalia School of Engineering and Technology",
        address: "Palakkad, Kerala, India",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Amrita Vishwa Vidyapeetham",
        address: "Coimbatore, Tamil Nadu, India",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palakkad",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    email: "kirangautham82899@gmail.com",
    sameAs: [
      "https://github.com/kirangautham-82899",
      "https://www.linkedin.com/in/kiran-gautham-b16319358/",
      SITE_URL,
    ],
    knowsAbout: [
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Python",
      "TypeScript",
      "AI/ML",
      "Cybersecurity",
      "Real-Time Systems",
      "FastAPI",
      "WebSockets",
      "PostgreSQL",
      "MongoDB",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Bangalore",
      },
      skills: "React, Next.js, Node.js, Python, TypeScript, FastAPI, AI/ML, Cybersecurity",
    },
    description:
      "Kiran Gautham is a Software Engineer at Sustains.ai. Full-stack developer specialising in React, Next.js, Node.js, Python, AI/ML, and cybersecurity. Published researcher, 15+ hackathon wins, B.Tech CSE 2026.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Kiran Gautham — Portfolio",
    description: "Personal portfolio of Kiran Gautham, Software Engineer specialising in full-stack, AI/ML, and cybersecurity.",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: "Kiran Gautham | Software Engineer Portfolio",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    dateModified: "2026-09-26",
    inLanguage: "en-IN",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="CAC2246A851C47AE5B3A9F80A4E44A96" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
