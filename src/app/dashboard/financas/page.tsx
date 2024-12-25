import FinancasPage from "@/components/pages/dashboard/FinancasPage";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export const metadata = {
  title: "Dashboard : Overview",
};

export default async function page() {
  const user = await getUser();
  if (!user) {
    return redirect("/");
  } else {
    return <FinancasPage />;
  }
}
