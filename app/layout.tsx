import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Min-JIRA",
  description: "The everything app for work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              error: "text-red-600 bg-red-50 border-none",
              success: "text-green-600 bg-green-50 border-none",
              warning: "text-yellow-600 bg-yellow-50 border-none",
              info: "text-blue-600 bg-blue-50 border-none",
            },
          }}
        />
      </body>
    </html>
  );
}
