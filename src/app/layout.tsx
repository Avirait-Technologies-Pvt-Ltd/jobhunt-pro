import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JobHunt Pro - Find Your Dream Job",
  description: "Discover thousands of job opportunities from top companies. Build your career with JobHunt Pro - the #1 job search platform for professionals.",
  keywords: ["jobs", "careers", "job search", "employment", "hiring", "recruitment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ToastProvider>
            {children}
            <Toaster position="top-right" richColors />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
