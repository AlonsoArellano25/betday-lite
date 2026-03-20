import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "BetDay Lite",
  description: "Timeline de apuestas deportivas con Next.js 15"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppProviders>
          <Header />
          <main className="app-shell">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
