"use client";

import React from "react";

import { signOut, useSession } from "next-auth/react";

const HomePage: React.FC = () => {
  React.useEffect(() => {
    import("@banners/MainBanner");
  }, []);
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="flex flex-col mb-20">
      <React.Suspense>
        <button onClick={() => signOut()}>Sair</button>
      </React.Suspense>
    </div>
  );
};

export default HomePage;
