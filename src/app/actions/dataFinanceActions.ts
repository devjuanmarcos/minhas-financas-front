"use server";

import fetchWrapper from "@/services/fetchWrapper";

type FormState = {
  message: string;
  success: boolean;
  data?: any;
};

export type FinanceItemType = {
  id: string;
  descricao: string;
  tipo: string;
  valor: number;
  fixo: boolean;
  mes_ano: string;
  created_at: Date;
  parcelas: string;
  categoria_id: number;
  subcategoria_id: number;
};

export type MonthlySummaryItemType = {
  mes_ano: string;
  total_ganhos: number;
  total_gastos: number;
};

export async function dataFinanceAction(): Promise<FormState> {
  try {
    const res = (await fetchWrapper("/transacoes?mes_ano=2024-11")) as FinanceItemType[];
    const data = res;
    return {
      success: true,
      message: "successo",
      data: data,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: (error as any).message || "Failed to perform login",
    };
  }
}

export async function dataFinanceMonthlySummaryAction(): Promise<FormState> {
  try {
    const res = (await fetchWrapper("/resumo-mensal?mes_ano=2024-11")) as MonthlySummaryItemType[];
    const data = res[0];
    console.log(data);
    return {
      success: true,
      message: "successo",
      data: data,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: (error as any).message || "Failed to perform login",
    };
  }
}
