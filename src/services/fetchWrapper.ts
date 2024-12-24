"use server";

import { auth } from "../../auth";

const baseURL = process.env.BASE_URL || "";

async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
  };

  const cacheBuster = `&_=${new Date().getTime()}`;
  const urlWithCacheBuster = `${baseURL}${endpoint}${endpoint.includes("?") ? "&" : "?"}${cacheBuster}`;

  // const session = await auth();
  // const token = session?.supabaseAccessToken;

  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }

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
