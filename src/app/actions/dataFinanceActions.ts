"use server";

import fetchWrapper from "@/services/fetchWrapper";
import { createExpenseService } from "@/services/financas/financaService";

type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, FormDataEntryValue>;
  issues?: string[];
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

export type SubCategorieType = {
  id: number;
  nome: string;
  categoria_id: number;
};

export async function dataFinanceAction(
  mes_ano?: string,
  last_three_months?: boolean,
  categoryId?: number
): Promise<FormState> {
  try {
    let url = "/transacoes";

    const queryParams = new URLSearchParams();

    if (mes_ano) {
      queryParams.append("mes_ano", mes_ano);
    }
    if (last_three_months) {
      queryParams.append("last_three_months", "true");
    }
    if (categoryId !== undefined) {
      queryParams.append("categoria", categoryId.toString());
    }

    if (Array.from(queryParams).length > 0) {
      url += `?${queryParams.toString()}`;
    }

    const res = (await fetchWrapper(url)) as FinanceItemType[];

    return {
      success: true,
      message: "successo",
      data: res,
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
    const data = res[0] as MonthlySummaryItemType;
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

export async function onSubmitExpenseAction(prevState: FormState, data: FormData): Promise<FormState> {
  try {
    let url = "/transacoes";

    const formData = Object.fromEntries(data.entries());

    const finalData = {
      descricao: formData.descricao,
      valor: parseFloat(formData.valor as string),
      data_completa: formData.data_completa,
      parcelas: parseInt(formData.parcelas as string),
      fixo: formData.fixo,
      subcategoria_id: parseInt(formData.subcategoria_id as string),
      categoria_id: 2,
    };

    const res = await createExpenseService(finalData);
    console.log(res);
    return {
      success: true,
      message: "successo",
    };
  } catch (error: any) {
    console.error("Error:", error);
    return {
      success: false,
      message: (error as any).message || "Failed to perform",
      issues: error.response.data?.issues || [error.response.data?.error as string] || [
          error.response.data?.message || "Erro desconhecido",
        ],
    };
  }
}

export async function dataSubCategoriesAction(categorieId: number): Promise<FormState> {
  try {
    let url = `/subcategorias/${categorieId}`;

    const res = (await fetchWrapper(url)) as SubCategorieType[];

    return {
      success: true,
      message: "successo",
      data: res,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      message: (error as any).message || "Failed to perform login",
    };
  }
}
