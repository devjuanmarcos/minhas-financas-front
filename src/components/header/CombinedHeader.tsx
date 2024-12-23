"use client";

import React from "react";
import SwitchWithIcon from "../ui/switchWithIcon";
import Image from "next/image";
import FontSizeSlider from "../ui/FontSizeSlider";
import { NextImage } from "../ui/NextImage";
import MouseSpeak from "../ui/MouseSpeak";
import { useTranslations } from "next-intl";
import { ComboboxLanguage } from "../ui/combobox-language";
import { useTheme } from "next-themes";
import BarToolsSkeleton from "../ui/BarToolsSkeleton";
import { VLibrasIntegration } from "./VLibrasIntegration";

export const CombinedHeader = ({ locale }: Readonly<{ locale: string }>) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const t = useTranslations("Header");
  const { theme } = useTheme();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownVisible && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible, sidebarOpen]);

  function ativarVLibras() {
    const vlibrasButton = document.querySelector('[vw-access-button="true"]') as HTMLElement;

    if (vlibrasButton) {
      vlibrasButton.click();
    }
  }

  if (!isMounted) {
    return <BarToolsSkeleton />;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-var-background-claro ">
      {/* BarTools */}
      <div className="relative flex justify-center md:justify-between gap-4 items-center bg-text-verde-medio w-full px-4 py-1 my-0 mx-auto text-cinza-800 ">
        <VLibrasIntegration />
        <div className="flex gap-4 text-cinza-800 items-center">
          <span className="md:contents hidden h2-semibold text-[1.4rem]">{t("acessibilidade")}</span>
          <SwitchWithIcon />
          <FontSizeSlider />

          <Image
            src={theme == "light" ? "/ico/librasDark.svg" : "/ico/libras.svg"}
            onClick={ativarVLibras}
            alt={t("ativarVLibras")}
            height={32}
            width={32}
            className="text-cinza-800 cursor-pointer"
          />
          <MouseSpeak />
          <ComboboxLanguage locale={locale} type="header" />
        </div>
        <div className="hidden lg:flex gap-1 items-center text-end max-h-[3.125rem] overflow-hidden">
          <span className="flex flex-col text-sm justify-end ">
            <span className="w-max text-end ">by</span>
          </span>

          <NextImage
            imageUrl={theme == "light" ? "/img/BIOMOB-PRETA-VERDE.png" : "/img/BIOMOB-BRANCA.png"}
            altImage={t("logo")}
            ariaLabel={t("logo")}
            sizes="100vw"
            className="w-[8.75rem] h-[1.625rem]"
          />
        </div>
      </div>
    </header>
  );
};

export default CombinedHeader;
