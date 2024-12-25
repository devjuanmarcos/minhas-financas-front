"use client";

import React from "react";
import PageContainer from "@/components/layout/page-container";
import ExpensePostForm from "@/components/forms/expensePost";
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
  dataInvestmentsAction,
  InvestmentItemType,
  FinanceItemType,
  MonthlySummaryItemType,
} from "@/app/actions/dataFinanceActions";
import { DialogComponent } from "@/components/ui/dialog-form";
import { useUpdate } from "@/context/UpdateContext";
import EarningPostForm from "@/components/forms/earningPost";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Plus } from "lucide-react";
import InvestmentPostForm from "@/components/forms/investmentPost";

interface FinanceSummary {
  total_gastos: number;
  total_ganhos: number;
  total_saldo: number;
  total_investido: number;
  finances: FinanceItemType[] | [];
  investments: InvestmentItemType[] | [];
}

interface DialogInteface {
  expenseDialog: boolean;
  earningDialog: boolean;
  investmentDialog: boolean;
}

export default function FinancasPage() {
  const [isOpenDialog, setIsOpenDialog] = React.useState<DialogInteface>({
    expenseDialog: false,
    earningDialog: false,
    investmentDialog: false,
  });
  const [monthlySummary, setMonthlySummary] = React.useState<FinanceSummary>({
    total_gastos: 0,
    total_ganhos: 0,
    total_saldo: 0,
    total_investido: 0,
    finances: [],
    investments: [],
  });
  const { updateKey } = useUpdate();

  React.useEffect(() => {
    setIsOpenDialog({
      expenseDialog: false,
      earningDialog: false,
      investmentDialog: false,
    });
  }, [updateKey]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const financeMonthly = await dataFinanceMonthlySummaryAction();
        const finances = await dataFinanceAction("2024-12", false);
        const investment = await dataInvestmentsAction(1);
        const data = financeMonthly.data as MonthlySummaryItemType;
        const data2 = finances.data as FinanceItemType[];
        const data3 = investment.data as InvestmentItemType[];
        setMonthlySummary({
          total_gastos: data.total_gastos,
          total_ganhos: data.total_ganhos,
          total_investido: data.total_investido,
          total_saldo: Math.abs(data.total_ganhos - data.total_gastos - data.total_investido),
          finances: data2,
          investments: data3,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [updateKey]);

  const toggleDialog = (dialogName: keyof DialogInteface) => {
    setIsOpenDialog((prevState) => ({
      ...prevState,
      [dialogName]: !prevState[dialogName],
    }));
  };

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
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() =>
                        setIsOpenDialog({ expenseDialog: false, earningDialog: false, investmentDialog: true })
                      }
                    >
                      <Edit className="h-4 w-4 text-muted-foreground  " />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {monthlySummary.investments?.[0]?.quantidade !== undefined ? (
                      <div className="text-2xl font-bold">R$ {monthlySummary.investments[0].quantidade}</div>
                    ) : (
                      <Skeleton className="inline-block w-[6.25rem] h-[1.8rem] " />
                    )}
                    <p className="text-xs text-muted-foreground">
                      Dinheiro guardado nas caixinhas do Nubank com o intuito de comprar uma casa
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos do mês</CardTitle>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() =>
                        setIsOpenDialog({ expenseDialog: true, earningDialog: false, investmentDialog: false })
                      }
                    >
                      <Plus className="h-4 w-4 text-muted-foreground  " />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {monthlySummary.total_gastos !== 0 ? (
                      <div className="text-2xl font-bold">R$ {monthlySummary.total_gastos}</div>
                    ) : (
                      <Skeleton className="inline-block w-[6.25rem] h-[1.8rem] " />
                    )}
                    <p className="text-xs text-muted-foreground">
                      Total gasto com contas fixas e variáveis no mês de dezembro
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ganhos do mês</CardTitle>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() =>
                        setIsOpenDialog({ expenseDialog: false, earningDialog: true, investmentDialog: false })
                      }
                    >
                      <Plus className="h-4 w-4 text-muted-foreground  " />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {monthlySummary.total_ganhos !== 0 ? (
                      <div className="text-2xl font-bold">R$ {monthlySummary.total_ganhos}</div>
                    ) : (
                      <Skeleton className="inline-block w-[6.25rem] h-[1.8rem] " />
                    )}
                    <p className="text-xs text-muted-foreground">Total recebido (Salário, freelas, etc.)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo em conta</CardTitle>
                    <Button variant={"ghost"} size={"sm"}>
                      <Plus className="h-4 w-4 text-muted-foreground  " />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {monthlySummary.total_saldo !== 0 ? (
                      <div className="text-2xl font-bold">R$ {monthlySummary.total_saldo}</div>
                    ) : (
                      <Skeleton className="inline-block w-[6.25rem] h-[1.8rem] " />
                    )}
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
        open={isOpenDialog.investmentDialog}
        setOpen={() => toggleDialog("investmentDialog")}
        Form={InvestmentPostForm}
        buttonTitle="Atualizar"
        subTitle="Preencha corretamente todos os campos para finalizar a atualização dos valores investidos."
        title="Formulário de Atualização"
        notButton
        maxWidth="max-w-[40.5rem]"
      />
      <DialogComponent
        open={isOpenDialog.expenseDialog}
        setOpen={() => toggleDialog("expenseDialog")}
        Form={ExpensePostForm}
        buttonTitle="Cadastrar"
        subTitle="Preencha corretamente todos os campos para finalizar o cadastro com sucesso."
        title="Formulário de cadastro"
        notButton
        maxWidth="max-w-[40.5rem]"
      />
      <DialogComponent
        open={isOpenDialog.earningDialog}
        setOpen={() => toggleDialog("earningDialog")}
        Form={EarningPostForm}
        buttonTitle="Cadastrar"
        subTitle="Preencha corretamente todos os campos para finalizar o cadastro com sucesso."
        title="Formulário de cadastro"
        notButton
        maxWidth="max-w-[40.5rem]"
      />
    </>
  );
}
