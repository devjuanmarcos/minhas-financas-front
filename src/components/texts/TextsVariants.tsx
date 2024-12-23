import React from "react";

type T = HTMLDivElement;
interface TextsVariantsProps {
  text: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  variant?:
    | "titleH1Bold"
    | "titleH2Bold"
    | "topTitle"
    | "titleBold"
    | "titleSemibold"
    | "titleMedium"
    | "titleSimple"
    | "bannerParagraph"
    | "bannerCard"
    | "normalText"
    | "paragraphCard";
  showLine?: boolean;
  subtitle?: string;
  extraClassName?: React.HTMLAttributes<T>["className"];
  textCenter?: boolean;
  textDecoration?: string;
}

const defaultStyles = {
  color: "text-cinza-800",
  fontSize: "text-lg",
  fontWeight: "font-normal",
  lineHeight: "leading-normal",
  letterSpacing: "tracking-normal",
  textTransform: "normal-case",
  textDecoration: "no-underline",
};

const variantStyles = {
  titleH1Bold: {
    color: "text-cinza-800",
    fontSize: "md:text-[3.375rem] text-[3.125rem]",
    fontWeight: "font-bold",
    lineHeight: "leading-[54px]",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  titleH2Bold: {
    color: "text-cinza-800",
    fontSize: "md:text-[2.375rem] text-[2.125rem]",
    fontWeight: "font-bold",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  topTitle: {
    color: "text-cinza-800",
    fontSize: "md:text-[1.375rem] text-[1.125rem]",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-[2.5px]",
    textTransform: "uppercase",
    textDecoration: "no-underline",
  },
  bannerParagraph: {
    color: "text-cinza-800",
    fontSize: "md:text-[1.125rem] text-[1rem]",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  bannerCard: {
    color: "text-cinza-800",
    fontSize: "md:text-[1rem]",
    fontWeight: "font-medium",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  titleBold: {
    color: "text-cinza-800",
    fontSize: "md:text-[1.25rem] text-[1rem]",
    fontWeight: "font-bold",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  titleSemibold: {
    color: "text-cinza-800",
    fontSize: "md:text-[1.125rem] text-[1rem]",
    fontWeight: "font-semibold",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  titleMedium: {
    color: "text-cinza-800",
    fontSize: "md:text-[1.125rem] text-[1rem]",
    fontWeight: "font-medium",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  titleSimple: {
    color: "text-cinza-800",
    fontSize: "md:text-[1rem] text-[1rem]",
    fontWeight: "font-normal",
    lineHeight: "leading-normal",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  normalText: {
    color: "text-cinza-800",
    fontSize: "md:text-[2rem] text-[1rem]",
    fontWeight: "font-normal",
    lineHeight: "leading-[36px]",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
  paragraphCard: {
    color: "text-cinza-800",
    fontSize: "text-[1rem]",
    fontWeight: "font-medium",
    lineHeight: "leading-[22.4px]",
    letterSpacing: "tracking-normal",
    textTransform: "normal-case",
    textDecoration: "no-underline",
  },
};

export const TextsVariants: React.FC<TextsVariantsProps> = ({
  text,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  variant = "titleH1Bold",
  showLine = false,
  subtitle,
  extraClassName = "",
  textCenter = false,
  textDecoration = "no-underline",
}) => {
  const variantStyle = variantStyles[variant] || {};
  const finalColor = color || variantStyle.color || defaultStyles.color;
  const finalFontSize = fontSize || variantStyle.fontSize || defaultStyles.fontSize;
  const finalFontWeight = fontWeight || variantStyle.fontWeight || defaultStyles.fontWeight;
  const finalLineHeight = lineHeight || variantStyle.lineHeight || defaultStyles.lineHeight;
  const finalLetterSpacing = variant === "topTitle" ? variantStyle.letterSpacing : defaultStyles.letterSpacing;
  const finalTextTransform = variant === "topTitle" ? variantStyle.textTransform : defaultStyles.textTransform;
  const finalTextDecoration = textDecoration || variantStyle.textDecoration || defaultStyles.textDecoration;

  const textAlignmentClass = textCenter ? "text-center" : "";

  if (variant === "topTitle") {
    const subtitleStyle = variantStyles.titleH2Bold || {};
    return (
      <div className={textAlignmentClass}>
        {showLine && (
          <div className="">
            <p
              className={`${finalColor} ${finalFontSize} ${finalLetterSpacing} ${finalTextTransform} ${finalTextDecoration} ${extraClassName}`}
            >
              <span className="tracking-normal">━━</span> {text}
            </p>
          </div>
        )}
        {!showLine && (
          <p
            className={`${finalColor} ${finalFontSize} ${finalLetterSpacing} ${finalTextTransform} ${finalTextDecoration} ${extraClassName}`}
          >
            {text}
          </p>
        )}
        {subtitle && (
          <h2
            className={`h2-semibold ${subtitleStyle.color} ${subtitleStyle.fontSize} ${subtitleStyle.fontWeight} ${subtitleStyle.lineHeight} ${extraClassName}`}
          >
            {subtitle} <span className={subtitleStyle.color}></span>
          </h2>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${finalColor} ${finalFontSize} ${finalFontWeight} ${finalLineHeight} ${finalLetterSpacing} ${finalTextTransform} ${finalTextDecoration} ${textAlignmentClass} ${extraClassName}`}
    >
      {text}
    </div>
  );
};

export default TextsVariants;
