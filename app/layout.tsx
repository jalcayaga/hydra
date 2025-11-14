import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Hydra Control Dashboard",
  description: "Panel avanzado de monitoreo y control para sistemas hidráulicos"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} bg-slate-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
