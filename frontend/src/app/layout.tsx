import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatPanel } from "@/components/AIChatPanel";

export const metadata: Metadata = {
  title: "POLARIS | Polar Knowledge, Research, Intelligence & Outreach System",
  description: "India's centralized digital ecosystem for polar science research, expeditions, publications, datasets, and media outreach. Smart India Hackathon 2026 - Problem Statement 26063.",
  keywords: ["POLARIS", "NCPOR", "MoES", "Antarctica", "Arctic", "Bharati", "Maitri", "Himadri", "Himansh", "IndARC", "Polar Science", "SIH 2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#B49A82] selection:text-[#3B261C]">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <AIChatPanel />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
