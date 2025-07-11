import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/sonner";

const workSans = localFont({
  src: [
    { path: "./fonts/workSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/workSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/workSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/workSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/workSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/workSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/workSans-Thin.ttf", weight: "300", style: "normal" },
    { path: "./fonts/workSans-Light.ttf", weight: "200", style: "normal" },
    { path: "./fonts/workSans-ExtraLight.ttf", weight: "100", style: "normal" },
  ],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata = {
  title: "YC Directory",
  description: "Pitch, Vote and Grow",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className={`${workSans.variable} font-work-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
