import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Next.js Templates | OsamaTech",
  description: "A curated showcase of high-performance, aesthetically stunning Next.js templates. Available for custom web development and freelance projects.",
  keywords: ["Next.js Templates", "React", "Frontend Developer", "Web Design", "Glassmorphism", "Tailwind CSS", "Hire Developer"],
  openGraph: {
    title: "Premium Next.js Templates | OsamaTech",
    description: "Explore a prestigious collection of Next.js templates with pure glassmorphism and smooth animations. Hire me for your next project.",
    url: "https://osamatech786.github.io/Nextjs_Templates/",
    siteName: "Next.js Showcase",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Next.js Templates | OsamaTech",
    description: "A curated showcase of high-performance Next.js templates.",
  }
};

import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.variable}>
      <body suppressHydrationWarning className="font-sans bg-black text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Muhammad Osama Ahmed",
                "jobTitle": "Frontend Developer",
                "url": "https://osamatech786.github.io/Nextjs_Templates/",
                "sameAs": [
                  "https://linkedin.com/in/osamatech786",
                  "https://osamatech786.github.io/"
                ]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does Muhammad Osama Ahmed provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Muhammad Osama Ahmed provides Next.js frontend development, AI agent integrations, and premium UI/UX design featuring glassmorphism and modern web animations."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I hire OsamaTech?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can hire OsamaTech by booking a direct consultation via Calendly, reaching out through LinkedIn, or sending an email to discuss project requirements."
                  }
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
