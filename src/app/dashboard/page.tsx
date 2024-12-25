"use server";

import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = getUser();

  if (!user) {
    return redirect("/");
  } else {
    redirect("/dashboard/financas");
  }
}
