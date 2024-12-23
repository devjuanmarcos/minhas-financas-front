import { IconType } from "react-icons";
import TextsVariants from "../texts/TextsVariants";
import Image from "next/image";

type IconWithTextBannersProps = {
  image?: string;
  icon?: IconType;
  title: string;
  description?: string;
};

export type ThreeIconWithTextBannersProps = {
  topTitle?: string;
  title?: string;
  paragraph?: string;
  iconsCards: IconWithTextBannersProps[];
};

export const ThreeIconWithTextsBanner: React.FC<ThreeIconWithTextBannersProps> = ({
  title,
  topTitle,
  paragraph,
  iconsCards,
}) => {
  return (
    <div className="flex flex-col gap-12 text-center justify-center items-center px-4 sm:px-20">
      <div className="flex flex-col gap-1">
        {topTitle && title && (
          <TextsVariants textCenter={true} text={topTitle} variant={"topTitle"} showLine={true} subtitle={title} />
        )}
        {paragraph && <TextsVariants text={paragraph} variant="bannerParagraph" extraClassName="max-w-[60rem]" />}
      </div>
      <div className="flex flex-wrap [&>*]:max-w-[20rem] items-start justify-center gap-20 max-w-screen-xl">
        {iconsCards.map((iconCard: IconWithTextBannersProps) => (
          <IconWithTextBanner key={iconCard.title} {...iconCard} />
        ))}
      </div>
    </div>
  );
};

const IconWithTextBanner: React.FC<IconWithTextBannersProps> = ({ description, image, title, icon }) => {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-6 items-center justify-center ">
      {image && (
        <Image
          src={image}
          alt={title}
          width={300}
          height={120}
          className="text-white w-[18.75rem] h-auto bg-white p-4 rounded-lg"
        />
      )}
      {Icon && <Icon className="dark:text-white text-primary w-8 h-8" />}
      <div className="flex flex-col">
        <TextsVariants textCenter={true} text={title} variant={"titleBold"} showLine={true} subtitle={title} />
        {description && <TextsVariants textCenter={true} text={description} variant={"bannerParagraph"} />}
      </div>
    </div>
  );
};
