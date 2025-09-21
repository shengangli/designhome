import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://designstudio.com'),
  title: {
    default: "dustin studio | Digital Excellence",
    template: "%s | dustin studio"
  },
  description: "Complete digital solutions from concept to launch. We design, develop, and deploy exceptional digital experiences with Japanese design influence.",
  keywords: ["dustin studio", "web design", "web development", "digital agency", "UI/UX", "branding", "Japanese design"],
  authors: [{ name: "dustin studio" }],
  creator: "dustin studio",
  publisher: "dustin studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designstudio.com",
    siteName: "dustin studio",
    title: "dustin studio | Digital Excellence",
    description: "Complete digital solutions from concept to launch. We design, develop, and deploy exceptional digital experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "dustin studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dustin studio | Digital Excellence",
    description: "Complete digital solutions from concept to launch.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
