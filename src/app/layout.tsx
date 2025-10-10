import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexus Quantum - Agentic AI Data Centers | Rust-Powered Cloud Platform",
  description: "Nexus Quantum Technologies delivers the world&apos;s first vertically integrated, Rust-powered cloud platform for Agentic AI. Enterprise-grade infrastructure with quantum-safe security, blazing performance, and zero-trust architecture.",
  keywords: ["Agentic AI", "Quantum Computing", "Rust Cloud Platform", "AI Infrastructure", "Data Centers", "Quantum-Safe Security", "Enterprise AI", "NQRust", "NQRactor", "NQRedis"],
  authors: [{ name: "Nexus Quantum Technologies" }],
  openGraph: {
    title: "Nexus Quantum - Agentic AI Data Centers",
    description: "Rust-powered cloud platform for the Agentic AI era with quantum-safe security",
    url: "https://nexusquantum.id",
    siteName: "Nexus Quantum",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Quantum - Agentic AI Data Centers",
    description: "Rust-powered cloud platform for the Agentic AI era with quantum-safe security",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
