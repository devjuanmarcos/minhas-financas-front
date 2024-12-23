"use client";

import dynamic from "next/dynamic";
import React from "react";
import { ThreeIconWithTextBannersProps } from "../banners/ThreeIconWithTextsBanner";
import { useTranslations } from "next-intl";
import { FaChalkboardTeacher, FaCode, FaFileAlt, FaFlask, FaGamepad, FaMicrophoneAlt } from "react-icons/fa";

const MemoizedMainBanner = dynamic(() => import("@banners/MainBanner").then((mod) => mod.default), {
  loading: () => <span>Carregando...</span>,
});
const ScaleCarouselBanner = dynamic(() =>
  import("@banners/ScaleCarouselBanner").then((mod) => mod.ScaleCarouselBanner)
);
const SimpleTextWithBackgroundBanner = dynamic(() =>
  import("@/components/banners/SimpleTextWithBackgroundBanner").then((mod) => mod.SimpleTextWithBackgroundBanner)
);
const SimpleImageWithTextBanner = dynamic(() =>
  import("@/components/banners/SimpleImageWithTextBanner").then((mod) => mod.SimpleImageWithTextBanner)
);
const ThreeIconWithTextsBanner = dynamic(() =>
  import("@/components/banners/ThreeIconWithTextsBanner").then((mod) => mod.ThreeIconWithTextsBanner)
);

const HomePage: React.FC = () => {
  React.useEffect(() => {
    import("@banners/MainBanner");
  }, []);

  const MetodologiaBanner = useTranslations("MetodologiaBanner");
  const IconWithTextBanner = useTranslations("IconWithTextBanner");
  const OqueSeEsperaBanner = useTranslations("OqueSeEsperaBanner");
  const QuemParticipaBanner = useTranslations("QuemParticipaBanner");
  const ContatoBanner = useTranslations("ContatoBanner");

  let iconWithTextBannersData: ThreeIconWithTextBannersProps = {
    title: IconWithTextBanner("title"),
    topTitle: IconWithTextBanner("topTitle"),
    paragraph: IconWithTextBanner("paragraph"),
    iconsCards: [
      {
        title: IconWithTextBanner("iconCards.0.title"),
        description: IconWithTextBanner("iconCards.0.description"),
        image: "/img/colaboradores/LOGO-LNCC.png",
      },
      {
        title: IconWithTextBanner("iconCards.1.title"),
        description: IconWithTextBanner("iconCards.1.description"),
        image: "/img/colaboradores/LOGO-SERRATEC.png",
      },
      {
        title: IconWithTextBanner("iconCards.2.title"),
        description: IconWithTextBanner("iconCards.2.description"),
        image: "/img/colaboradores/LOGO-FAETERJ.png",
      },
      {
        title: IconWithTextBanner("iconCards.3.title"),
        description: IconWithTextBanner("iconCards.3.description"),
        image: "/img/colaboradores/LOGO-CEFET.png",
      },
      {
        title: IconWithTextBanner("iconCards.4.title"),
        description: IconWithTextBanner("iconCards.4.description"),
        image: "/img/colaboradores/LOGO-UFF.png",
      },
      {
        title: IconWithTextBanner("iconCards.5.title"),
        description: IconWithTextBanner("iconCards.5.description"),
        image: "/img/colaboradores/LOGO-UFBA.png",
      },
      {
        title: IconWithTextBanner("iconCards.6.title"),
        description: IconWithTextBanner("iconCards.6.description"),
        image: "/img/colaboradores/LOGO-BIOMOB.png",
      },
      {
        title: IconWithTextBanner("iconCards.7.title"),
        description: IconWithTextBanner("iconCards.7.description"),
        image: "/img/colaboradores/LOGO-QUIPOTEC.png",
      },
      {
        title: IconWithTextBanner("iconCards.8.title"),
        description: IconWithTextBanner("iconCards.8.description"),
        image: "/img/colaboradores/LOGO-PJRJ.png",
      },
      {
        title: IconWithTextBanner("iconCards.9.title"),
        description: IconWithTextBanner("iconCards.9.description"),
        image: "/img/colaboradores/LOGO-PREFEITURA-PETROPOLIS.png",
      },
      {
        title: IconWithTextBanner("iconCards.10.title"),
        description: IconWithTextBanner("iconCards.10.description"),
        image: "/img/colaboradores/LOGO-SEEDUC.png",
      },
    ],
  };

  let QuemParticipaBannerData: ThreeIconWithTextBannersProps = {
    iconsCards: [
      {
        title: QuemParticipaBanner("iconCards.0.title"),
        icon: FaCode,
      },
      {
        title: QuemParticipaBanner("iconCards.1.title"),
        icon: FaGamepad,
      },
      {
        title: QuemParticipaBanner("iconCards.2.title"),
        icon: FaFlask,
      },
      {
        title: QuemParticipaBanner("iconCards.3.title"),
        icon: FaMicrophoneAlt,
      },
      {
        title: QuemParticipaBanner("iconCards.4.title"),
        icon: FaChalkboardTeacher,
      },
      {
        title: QuemParticipaBanner("iconCards.5.title"),
        icon: FaFileAlt,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-20">
      <React.Suspense>
        <MemoizedMainBanner />
      </React.Suspense>

      <div className="flex flex-col border border-border gap-8 md:gap-24 items-center justify-center w-full bg-bg-marca100 rounded-[2.5rem] sm:rounded-[7rem] mt-[-6.25rem]  lg:py-[6.25rem] py-[4.0625rem]  z-10 mb-16">
        <ScaleCarouselBanner />
        <SimpleTextWithBackgroundBanner />
        <SimpleImageWithTextBanner
          type="row-reverse"
          title={MetodologiaBanner("title")}
          paragraph={MetodologiaBanner("paragraph")}
          image="/img/wallpaper/banner_mar.png"
          altImage={MetodologiaBanner("altImage")}
        />
      </div>
      <div className="flex flex-col gap-32">
        <SimpleImageWithTextBanner
          type="col"
          topTitle={OqueSeEsperaBanner("topTitle")}
          title={OqueSeEsperaBanner("title")}
          paragraph={OqueSeEsperaBanner("paragraph")}
          image="/img/wallpaper/banner_mar.png"
          altImage={OqueSeEsperaBanner("altImage")}
        />
        <ThreeIconWithTextsBanner {...iconWithTextBannersData} />
        <div className="flex flex-col gap-12">
          <SimpleImageWithTextBanner
            type="col"
            topTitle={QuemParticipaBanner("topTitle")}
            title={QuemParticipaBanner("title")}
            paragraph={QuemParticipaBanner("paragraph")}
          />
          <ThreeIconWithTextsBanner {...QuemParticipaBannerData} />
        </div>
        <div id="contato">
          <SimpleImageWithTextBanner
            type="col"
            topTitle={ContatoBanner("topTitle")}
            title={ContatoBanner("title")}
            paragraph={ContatoBanner("paragraph")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
