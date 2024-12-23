"use client";

import React, { FC, memo } from "react";
import { Button } from "../button/Button";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";

const MainBanner: FC = () => {
  const imageRef1 = React.useRef(null);

  const handleImageLoad = (ref: React.MutableRefObject<any>) => {
    ref.current.dataset.loaded = "true";
  };

  return (
    <div
      className="bg-no-repeat bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(/img/wallpaper/banner_mar.png)` }}
    >
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-full">
        <div className="flex flex-col gap-4 items-center max-w-[60rem] relative">
          <TextsVariants
            text="Coloque aqui o top título do Main Banner"
            variant="topTitle"
            showLine={false}
            extraClassName="text-center"
          />
          <TextsVariants variant="titleH1Bold" text="Coloque aqui o título do Main Banner" textCenter={true} />
          <div className="max-w-[40.9375rem] mt-4">
            <TextsVariants variant="titleBold" text="Coloque aqui a descrição do Main Banner" textCenter={true} />
          </div>
          <Button text="SOBRE NÓS" width="fit" />
        </div>
        <div className="w-full absolute bottom-0">
          <Image
            ref={imageRef1}
            src="/img/grafismos/onda_1.svg"
            alt="Grafismo de onda"
            width={1300}
            height={142}
            className=" h-auto blur-up"
            quality={100}
            sizes="1300px"
            placeholder="blur"
            blurDataURL="data:..."
            onLoad={() => handleImageLoad(imageRef1)}
          />
        </div>
      </div>
    </div>
  );
};

const MemoizedMainBanner = memo(MainBanner);
MemoizedMainBanner.displayName = "MainBanner";

export default MemoizedMainBanner;
