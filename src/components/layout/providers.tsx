"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { WindowSizeProvider } from "@/context/WindowSizeContext";
import { HtmlFontSizeProvider } from "@/context/HtmlFontSizeContext";
export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <WindowSizeProvider>
        <HtmlFontSizeProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </HtmlFontSizeProvider>
      </WindowSizeProvider>
    </>
  );
}
