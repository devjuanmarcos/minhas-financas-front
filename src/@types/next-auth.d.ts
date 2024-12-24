import "next-auth";

declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string;
  }

  interface JWT {
    supabaseAccessToken?: string;
  }
}
