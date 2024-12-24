import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/layout/providers";
import { auth } from "../../auth";
import { Nunito, Martel, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const APP_NAME = "Biomob";
const APP_DEFAULT_TITLE = "Biomob";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Biomob!";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const martel = Martel({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html
      className={`${nunito.variable} ${martel.variable} ${montserrat.variable}`}
      suppressHydrationWarning
      lang="pt-BR"
    >
      <Script defer data-domain="biomob.org" src="https://plausible.biomob.app/js/script.js" />
      <body className={"overflow-hidden"}>
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
