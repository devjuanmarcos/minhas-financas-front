import Image from "next/image";
import TextsVariants from "../texts/TextsVariants";
import { handleImageLoad } from "@/utils/handleImageLoad";
import React from "react";

export const SimpleTextWithBackgroundBanner = () => {
  const imageRef1 = React.useRef(null);

  return (
    <div
      className={`flex justify-center text-center bg-[url(/img/wallpaper/banner_mar.png)] py-28 object-cover bg-cover w-full relative `}
    >
      <TextsVariants
        textCenter={true}
        text="Loc David: Os oceanos deixaram este mundo habitável; o ar que respiramos vem deles. Sem o azul dos oceanos,
            não haveria o verde da vida, e você nem estaria aqui! Essas águas abraçam a maior e mais rica biodiversidade
            da Terra, sustentando um som gigante como o mundo."
        variant="bannerParagraph"
        extraClassName="max-w-[60rem]"
      />
      <Image
        src="/img/grafismos/onda_3.svg"
        alt="Grafismo de onda"
        sizes="100%"
        className="max-h-[51.875rem] absolute -bottom-32 -z-10"
        placeholder="blur"
        blurDataURL="data:..."
        width={1300}
        height={142}
        onLoad={() => handleImageLoad(imageRef1)}
      />
    </div>
  );
};
