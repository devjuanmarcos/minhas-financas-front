import React from "react";
import { Button } from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="relative min-h-screen bg-bg-principal">
      <div className="absolute top-0 left-0 w-1/3 h-1/3 -mt-12">
        <Image
          src="/img/Ondinhas.svg"
          alt="ondas"
          layout="fill"
          objectFit="contain"
          className="transform -scale-y-100"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 mb-16">
        <Image src="/img/Ondinhas.svg" alt="ondas" layout="fill" objectFit="contain" />
      </div>

      <div
        className="relative flex flex-col items-center justify-center min-h-screen text-center"
        style={{ top: "-20vh" }}
      >
        <h2 className="text-4xl text-var-verde-400 font-bold mb-2">Erro 404</h2>
        <h1 className="text-3xl font-bold mb-10">Página não encontrada</h1>
        <h1 className="text-var-cinza-600 text-lg">A página que você está procurando não existe.</h1>
        <div className="hidden sm:flex mt-16">
          <Link href="http://www.biomob.org/home">
            <Button text={"Voltar"} variant={"primary"} size={"normal"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
