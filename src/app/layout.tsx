import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/layout/providers";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { auth } from "../../auth";

const APP_NAME = "Biomob";
const APP_DEFAULT_TITLE = "Biomob";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Biomob!";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.FRONTEND_URL || "http://localhost:3000"),
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html className={`${GeistSans.variable}`} suppressHydrationWarning lang="pt-BR">
      <Script defer data-domain="biomob.org" src="https://plausible.biomob.app/js/script.js" />
      <body className={"overflow-hidden"}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
