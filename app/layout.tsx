import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nitol Rozario — Architect & 3D Generalist",
  description:
    "Portfolio of Nitol Vincent Rozario — Architect, 3D Generalist, CGI Artist, and Design Consultant based in Dhaka, Bangladesh.",
  keywords: [
    "architecture",
    "3D generalist",
    "CGI",
    "visualization",
    "Blender",
    "Bangladesh",
    "portfolio",
  ],
  authors: [{ name: "Nitol Vincent Rozario" }],
  openGraph: {
    title: "Nitol Rozario — Architect & 3D Generalist",
    description:
      "Portfolio of Nitol Vincent Rozario — Architect, 3D Generalist, CGI Artist, and Design Consultant based in Dhaka, Bangladesh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white text-black antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
