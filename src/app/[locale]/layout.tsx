import type { Metadata } from "next";
import "./globals.css";
import { HtmlFontSizeProvider } from "@/context/HtmlFontSizeContext";
import { ThemeProvider } from "next-themes";
import { WindowSizeProvider } from "@/context/WindowSizeContext";
import { Nunito, Martel, Montserrat } from "next/font/google";
import { Header } from "@/components/header/Header";
import { BarTools } from "@/components/barra-acessibilidade/BarTools";
import Script from "next/script";
import { Footer } from "@/components/footer/footer";
import { NextIntlClientProvider, useMessages } from "next-intl";
import CombinedHeader from "@/components/header/CombinedHeader";

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
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html
      className="transition-all h-full w-full scrollbar-thin scrollbar-webkit duration-200 ease-in-out"
      suppressHydrationWarning
      lang="pt-BR"
    >
      <Script defer data-domain="biomob.org" src="https://plausible.biomob.app/js/script.js" />
      <body className={`${nunito.variable} ${martel.variable} ${montserrat.variable}`}>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <WindowSizeProvider>
            <HtmlFontSizeProvider>
              <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false}>
                <div className="header">
                  <CombinedHeader locale={params.locale} />
                </div>
                <main className="">{children}</main>
                <Footer />
              </ThemeProvider>
            </HtmlFontSizeProvider>
          </WindowSizeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
