import { FinanceItemType } from "@/app/actions/dataFinanceActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales({ finances }: { finances: FinanceItemType[] }) {
  return (
    <div className="space-y-8 max-h-[19.5rem] overflow-y-auto scrollbar-hide">
      {finances.map((finance) => (
        <div key={finance.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{finance.tipo === "gasto" ? "-" : "+"}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{finance.descricao}</p>
            <p className="text-sm text-muted-foreground">
              {finance.fixo ? "Gasto fixo do mês de dezembro" : "Salário fixo do mês"}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {finance.tipo === "gasto" ? "-" : "+"} R$ {finance.valor}
          </div>
        </div>
      ))}
    </div>
  );
}
