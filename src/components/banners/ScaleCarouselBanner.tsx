import React from "react";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { handleImageLoad } from "@/utils/handleImageLoad";
import { useTranslations } from "next-intl";
import EmblaCarousel from "../emblaCarousel/EmblaCarousel";

export const ScaleCarouselBanner = () => {
  const imageRef1 = React.useRef(null);

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const t = useTranslations("");

  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute z-0 left-0 ml-[-15rem] sm:block hidden">
        <Image
          src="/img/grafismos/onda_2.svg"
          alt={t("Outros.ondinhas")}
          sizes="100%"
          className="max-h-[51.875rem]"
          placeholder="blur"
          blurDataURL="data:..."
          width={142}
          height={1300}
          onLoad={() => handleImageLoad(imageRef1)}
        />
      </div>

      <div className="md:px-10">
        <div className="flex justify-center">
          <div className="max-w-full flex flex-col gap-[5.3125rem]">
            <div className="max-w-[60rem] mx-auto px-4 sm:px-6 ">
              <TextsVariants
                textCenter={true}
                text={t("OQueEBanner.topTitle")}
                variant="topTitle"
                showLine={true}
                subtitle={t("OQueEBanner.title")}
              />
              <TextsVariants textCenter={true} text={t("OQueEBanner.paragraph")} variant="bannerParagraph" />
            </div>
            <div>
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
