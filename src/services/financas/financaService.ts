import { AxiosResponse } from "axios";
import api from "../axiosWrapper";

export async function createExpenseService(finalData: any): Promise<AxiosResponse<void>> {
  return await api.post("/transacoes", finalData);
}

export async function updateInvestmentNubankBoxService(finalData: any): Promise<AxiosResponse<void>> {
  return await api.put("/investimentos/1", finalData);
}
