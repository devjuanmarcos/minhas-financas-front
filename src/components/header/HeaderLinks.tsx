"use client";

import { usePathname } from "next/navigation";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaDiscord, FaGithub, FaYoutube } from "react-icons/fa";
import IconButton from "../button/IconButton";

export const HeaderLinks = () => {
  const pathname = usePathname();

  if (!pathname.includes("/residencia")) return;

  return (
    <>
      <IconButton
        alt="Acessar grupo do Whatsapp"
        Icon={IoLogoWhatsapp}
        url="https://www.youtube.com/c/SerratecOficial"
      />
      <IconButton alt="Acessar Youtube do Serratec" Icon={FaYoutube} url="https://www.youtube.com/c/SerratecOficial" />
      <IconButton alt="Acessar Discord do Serratec" Icon={FaDiscord} url="https://discord.gg/fU3FypzWbG" />
      <IconButton alt="Acessar GitHub do Serratec" Icon={FaGithub} url="https://github.com/" />
    </>
  );
};
