import { AxiosResponse } from "axios";
import api from "../axiosWrapper";

export async function createExpenseService(finalData: any): Promise<AxiosResponse<void>> {
  return await api.post("/transacoes", finalData);
}
