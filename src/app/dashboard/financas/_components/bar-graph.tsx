"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dataFinanceAction } from "@/app/actions/dataFinanceActions";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useUpdate } from "@/context/UpdateContext";

export const description = "Gráficos de barras para gastos fixos e variáveis";

const chartConfig = {
  fixo: {
    label: "Gastos Fixos",
    color: "hsl(var(--primary))",
  },
  variaveis: {
    label: "Gastos Variáveis",
    color: "hsl(var(--chart-1))",
  },
};

export function BarGraph() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [activeChart, setActiveChart] = React.useState<"fixo" | "variaveis">("fixo");
  const { updateKey } = useUpdate();

  React.useEffect(() => {
    async function fetch() {
      try {
        const res = await dataFinanceAction("", true, 2);
        if (!res.success) {
          throw new Error("Ocorreu um erro ao buscar o extrato.");
        }
        setChartData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [updateKey]);

  const fixoData = React.useMemo(() => chartData.filter((item) => item.fixo === true), [chartData]);
  const variavelData = React.useMemo(() => chartData.filter((item) => item.fixo === false), [chartData]);

  const totalFixo = React.useMemo(() => fixoData.reduce((acc, curr) => acc + curr.valor, 0), [fixoData]);
  const totalVariavel = React.useMemo(() => variavelData.reduce((acc, curr) => acc + curr.valor, 0), [variavelData]);

  const dataToDisplay = activeChart === "fixo" ? fixoData : variavelData;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gastos Fixos e Variáveis</CardTitle>
          <CardDescription>Visualize os gráficos de gastos fixos e variáveis separadamente</CardDescription>
        </div>
        <div className="flex">
          {["fixo", "variaveis"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key as "fixo" | "variaveis")}
            >
              <span className="text-xs text-muted-foreground">{chartConfig[key as "fixo" | "variaveis"].label}</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {key === "fixo" ? totalFixo.toLocaleString() : totalVariavel.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
          <BarChart
            accessibilityLayer
            data={dataToDisplay}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes_ano"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const [year, month] = value.split("-");
                return `${month}/${year}`;
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const [year, month] = value.split("-");
                    return `${month}/${year}`;
                  }}
                />
              }
            />
            <Bar dataKey="valor" fill={chartConfig[activeChart].color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
