import Image from "next/image";
import TextsVariants from "../texts/TextsVariants";
import { handleImageLoad } from "@/utils/handleImageLoad";
import React from "react";

type ButtonContent = {
  text: string;
  link?: string;
  target?: string;
};

type SimpleImageWithTextBannerProps = {
  type: "col" | "row" | "row-reverse";
  title?: string;
  topTitle?: string;
  paragraph?: string;
  button?: ButtonContent;
  image?: string;
  altImage?: string;
};

export const SimpleImageWithTextBanner: React.FC<SimpleImageWithTextBannerProps> = ({
  type,
  topTitle,
  paragraph,
  title,
  image,
  altImage,
}) => {
  const imageRef1 = React.useRef<HTMLImageElement | null>(null);

  const commonContainerClasses =
    "flex flex-col px-4 lg:px-8 lg:grid grid-cols-2 max-w-[60rem] md:gap-8 gap-2 justify-center text-center w-full items-center";
  const commonTextClasses = "flex flex-col text-left";

  const TextContent: React.FC = () => (
    <div className={commonTextClasses}>
      {title && (
        <TextsVariants textCenter={type === "col"} text={title} variant="titleH2Bold" extraClassName="max-w-[60rem]" />
      )}
      {paragraph && (
        <TextsVariants
          textCenter={type === "col"}
          text={paragraph}
          variant="bannerParagraph"
          extraClassName="max-w-[60rem]"
        />
      )}
    </div>
  );

  return (
    <div
      className={
        type === "col"
          ? "max-w-[60rem] mx-auto px-2 lg:px-8"
          : commonContainerClasses + (type === "row-reverse" ? " lg:flex-row-reverse" : "")
      }
    >
      {type === "col" ? (
        <>
          {topTitle && <TextsVariants textCenter text={topTitle} variant="topTitle" showLine subtitle={title} />}
          {paragraph && <TextsVariants textCenter text={paragraph} variant="bannerParagraph" />}
          {image && (
            <Image
              src={image}
              alt={altImage || ""}
              width={706}
              height={435}
              quality={100}
              className="rounded-[1.25rem] mt-8 mx-auto object-cover w-full bg-cover"
            />
          )}
        </>
      ) : (
        <>
          {type === "row-reverse" && <TextContent />}
          {image && (
            <Image
              ref={imageRef1}
              src={image}
              alt={altImage || ""}
              sizes="100%"
              className="w-full h-full aspect-video rounded-lg object-cover bg-cover"
              placeholder="blur"
              blurDataURL="data:..."
              quality={100}
              width={635}
              height={394}
              onLoad={() => {
                if (imageRef1.current) handleImageLoad(imageRef1);
              }}
            />
          )}
          {type === "row" && <TextContent />}
        </>
      )}
    </div>
  );
};
