"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Sonner
      position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": isDark ? "#0f172a" : "#ffffff", // slate-950 or white
          "--normal-text": isDark ? "#f8fafc" : "#020617", // slate-50 or slate-950
          "--normal-border": isDark ? "#1e293b" : "#e2e8f0", // optional
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
