import { redirect } from "next/navigation"; 

export default function RootApp() {
  redirect("/app");

  return <span>Redirecionando...</span>;
}
