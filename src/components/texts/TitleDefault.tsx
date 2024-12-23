import { TitleDefaultType } from "@/@types/types";
import React from "react";

export const TitleDefault: React.FC<TitleDefaultType> = ({
  title,
  subtitle,
  description,
  extraClassName,
  textColor,
}) => {
  return (
    <div>
      <div className={`flex items-center mb-2 flex-nowrap`}>
        <span className={`top-title-medium ${textColor}`}> ━━ {title}</span>
      </div>
      <h2 className={`h2-semibold mb-6 ${textColor} ${extraClassName}`}>
        {subtitle} <span className={textColor}></span>
      </h2>
      <p className={`paragraph-banner ${textColor}`}>{description}</p>
    </div>
  );
};
