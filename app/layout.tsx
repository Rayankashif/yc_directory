import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/sonner";

const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/WorkSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/WorkSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/WorkSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/WorkSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/WorkSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/WorkSans-Thin.ttf", weight: "300", style: "normal" },
    { path: "./fonts/WorkSans-Light.ttf", weight: "200", style: "normal" },
    { path: "./fonts/WorkSans-ExtraLight.ttf", weight: "100", style: "normal" },
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
