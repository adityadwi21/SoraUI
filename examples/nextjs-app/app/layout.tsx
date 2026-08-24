import type { ReactNode } from "react";
import { getThemeInitScript } from "@soraui/core";
import "./globals.css";

export const metadata = {
  title: "SoraUI Next.js Consumer Example",
  description: "Production verification fixture for SoraUI React design system",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeInitScript({
              defaultTheme: "sky",
              defaultMode: "light",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
