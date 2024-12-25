"use client";

import React from "react";
import PageContainer from "@/components/layout/page-container";
import { AreaGraph } from "@/app/dashboard/financas/_components/area-graph";
import { BarGraph } from "@/app/dashboard/financas/_components/bar-graph";
import { PieGraph } from "@/app/dashboard/financas/_components/pie-graph";
import { RecentSales } from "@/app/dashboard/financas/_components/recent-sales";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dataFinanceAction,
  dataFinanceMonthlySummaryAction,
  FinanceItemType,
  MonthlySummaryItemType,
} from "@/app/actions/dataFinanceActions";
import { DialogComponent } from "@/components/ui/dialog-form";
import ExpensePostForm from "@/components/forms/expensePost";
import { useUpdate } from "@/context/UpdateContext";

interface FinanceSummary {
  total_gastos: number;
  total_ganhos: number;
  total_saldo: number;
  finances: FinanceItemType[] | [];
}

export default function FinancasPage() {
  const [isOpenDialogRegister, setIsOpenDialogRegister] = React.useState<boolean>(false);
  const [monthlySummary, setMonthlySummary] = React.useState<FinanceSummary>({
    total_gastos: 0,
    total_ganhos: 0,
    total_saldo: 0,
    finances: [],
  });
  const { updateKey } = useUpdate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dataFinanceMonthlySummaryAction();
        const res2 = await dataFinanceAction("2024-11", false);
        const data = res.data as MonthlySummaryItemType;
        const data2 = res2.data as FinanceItemType[];
        setMonthlySummary({
          total_gastos: data.total_gastos,
          total_ganhos: data.total_ganhos,
          total_saldo: Math.abs(data.total_ganhos - data.total_gastos),
          finances: data2,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [updateKey]);

  return (
    <>
      <PageContainer scrolllable>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="title_01 tracking-tight">Olá, Juan. Seja muito bem vindo de volta! 👋</h2>
            <div className="hidden items-center space-x-2 md:flex">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Dados gerais</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Relatórios
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Caixinha</CardTitle>
                    <Button variant={"ghost"} size={"sm"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 2345,90</div>
                    <p className="text-xs text-muted-foreground">
                      Dinheiro guardado nas caixinhas do Nubank com o intuito de comprar uma casa
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos do mês</CardTitle>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setIsOpenDialogRegister(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ {monthlySummary.total_gastos}</div>
                    <p className="text-xs text-muted-foreground">
                      Total gasto com contas fixas e variáveis no mês de dezembro
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ganhos do mês</CardTitle>
                    <Button variant={"ghost"} size={"sm"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ {monthlySummary.total_ganhos}</div>
                    <p className="text-xs text-muted-foreground">Total recebido (Salário, freelas, etc.)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo em conta</CardTitle>
                    <Button variant={"ghost"} size={"sm"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ {monthlySummary.total_saldo}</div>
                    <p className="text-xs text-muted-foreground">
                      Saldo atual em conta (ganhos - gastos do mês de dezembro)
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <BarGraph />
                </div>
                <Card className="col-span-4 md:col-span-3">
                  <CardHeader>
                    <CardTitle>Alterações recentes</CardTitle>
                    <CardDescription>Ganhos, gastos e investimentos mais recentes da sua conta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales finances={monthlySummary.finances} />
                  </CardContent>
                </Card>
                <div className="col-span-4">
                  <AreaGraph />
                </div>
                <div className="col-span-4 md:col-span-3">
                  <PieGraph />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>

      <DialogComponent
        open={isOpenDialogRegister}
        setOpen={setIsOpenDialogRegister}
        Form={ExpensePostForm}
        buttonTitle="Cadastrar"
        subTitle="Preencha corretamente todos os campos para finalizar o cadastro com sucesso."
        title="Formulário de cadastro"
        notButton
        maxWidth="max-w-[40.5rem]"
      />
    </>
  );
}
