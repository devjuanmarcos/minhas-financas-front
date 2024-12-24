"use server";

import axios, { AxiosInstance } from "axios";
import { auth } from "../../auth";

export type LoginResProps = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: "Bearer";
  "not-before-policy": number;
  session_state: string;
  scope: string;
};

const URL_API: string = process.env.BASE_URL || "";

const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: URL_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    try {
      const session = await auth();
      console.log(session);
      if (session?.supabaseAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${session.supabaseAccessToken}`,
        };
      }
    } catch (error) {
      console.error("Erro ao obter a sessão:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
