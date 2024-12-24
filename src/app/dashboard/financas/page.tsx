import HomePage from "@/components/pages/HomePage";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export const metadata = {
  title: "Dashboard : Overview",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  } else {
    return <HomePage />;
  }
}
