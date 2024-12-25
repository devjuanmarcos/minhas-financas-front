import axios, { AxiosInstance } from "axios";
import { getAuthTokens } from "./fetchWrapper";

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
      const { accessToken, refreshToken } = await getAuthTokens();
      console.log(accessToken, refreshToken);

      config.headers = {
        ...config.headers,
        ...(accessToken ? { "supabase.token": accessToken } : {}),
        ...(refreshToken ? { "supabase.refresh_token": refreshToken } : {}),
      };
    } catch (error) {
      console.error("Erro ao obter a sessão:", error);
      // Caso a obtenção dos tokens falhe, você pode tratar aqui, talvez redirecionando para a página de login
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
