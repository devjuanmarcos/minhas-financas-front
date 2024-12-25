"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useTransition } from "react";
import { Provider } from "@supabase/supabase-js";
import { loginAction } from "@/app/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function GithubSignInButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (provider: Provider) => {
    startTransition(async () => {
      const { errorMessage, url } = await loginAction(provider);
      if (!errorMessage && url) {
        router.push(url);
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => handleClickLoginButton("github")}
      loading={isPending}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue com Github
    </Button>
  );
}
