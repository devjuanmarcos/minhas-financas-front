"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Função para obter o cliente do Supabase
export async function getSupabaseClient() {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookies().set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookies().delete({ name, ...options });
      },
    },
  });
}

// Função para recuperar o session e acessar os tokens
export async function getAuthTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Erro ao obter sessão:", error);
    return { accessToken: null, refreshToken: null };
  }

  const accessToken = data?.session?.access_token || null;
  const refreshToken = data?.session?.refresh_token || null;

  return { accessToken, refreshToken };
}

const baseURL = process.env.BASE_URL || "";

async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { accessToken, refreshToken } = await getAuthTokens();
  console.log(accessToken, refreshToken);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
    ...(accessToken ? { "supabase.token": accessToken } : {}),
    ...(refreshToken ? { "supabase.refresh_token": refreshToken } : {}),
  };

  const cacheBuster = `&_=${new Date().getTime()}`;
  const urlWithCacheBuster = `${baseURL}${endpoint}${endpoint.includes("?") ? "&" : "?"}${cacheBuster}`;

  console.log("Headers enviados:", headers);

  try {
    const response = await fetch(urlWithCacheBuster, {
      ...options,
      headers: new Headers(headers),
    });

    if (!response.ok) {
      let errorMessage = `An error occurred: ${response.statusText} (${response.status})`;
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch {
        errorMessage = `An error occurred: ${response.statusText} (${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json() as Promise<T>;
    } else {
      return {} as T;
    }
  } catch (error) {
    console.error("fetchWrapper error:", error);
    throw error;
  }
}

export default fetchWrapper;
