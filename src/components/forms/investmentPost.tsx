import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormState } from "react-dom";
import {
  dataInvestmentsAction,
  dataInvestmentsCategoriesAction,
  InvestmentItemType,
  onSubmitInvestmentNubankBoxAction,
  SubCategorieType,
} from "@/app/actions/dataFinanceActions";
import { useToastFeedback } from "@/hooks/useToastFeedback";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

export const InvestmentPostFormSchema = z.object({
  quantidade: z.string().optional(),
  categoria_id: z.string().optional(),
  extrair_saldo: z.boolean().optional(),
});

type FormData = z.infer<typeof InvestmentPostFormSchema>;

const InvestmentPostForm = () => {
  const [state, formAction] = useFormState(onSubmitInvestmentNubankBoxAction, {
    message: "",
    success: false,
  });
  const { loading, setLoading } = useToastFeedback({ state });
  const [subCategories, setSubCategories] = React.useState<SubCategorieType[]>([]);
  const [investment, setInvestment] = React.useState<InvestmentItemType | null>(null);

  const formRef = React.useRef<HTMLFormElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(InvestmentPostFormSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    async function fetch() {
      try {
        const investmentsCategories = await dataInvestmentsCategoriesAction();
        const investmentData = await dataInvestmentsAction(1);
        setSubCategories(investmentsCategories.data);
        setInvestment(investmentData.data[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetch();
  }, []);

  React.useEffect(() => {
    if (investment) {
      form.setValue("quantidade", String(investment.quantidade));
      form.setValue("categoria_id", String(investment.categoria_id));
    }
  }, [investment]);

  const onSubmit = async () => {
    setLoading(true);
    const formData = new FormData(formRef.current!);
    console.log("FormData antes do envio:", Array.from(formData.entries()));
    formAction(formData);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className=""
        action={formAction}
        onSubmit={(evt: React.FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            onSubmit();
          })(evt);
        }}
      >
        {!investment ? (
          <Loader2 className={cn("h-8 w-8 m-auto animate-spin")} />
        ) : (
          <div className="grid gap-4 px-3 mb-4">
            {inputs.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id as any}
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2 items-start">
                    <FormLabel>{item.label}</FormLabel>
                    {item.type === "boolean" ? (
                      <div className="flex items-center">
                        <Switch
                          checked={field.value || false}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          {...field}
                        />
                      </div>
                    ) : item.type === "select" ? (
                      <Select
                        onValueChange={(value: string) => {
                          form.setValue("categoria_id", value);
                        }}
                        {...field}
                        value={field.value as string}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a subcategoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Subcategorias</SelectLabel>
                            {subCategories.map((subCategory) => (
                              <SelectItem key={subCategory.id} value={String(subCategory.id)}>
                                {subCategory.nome}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input placeholder={item.placeholder} {...field} type={item.type} />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}
        <Button type="submit" className="mt-4" loading={loading}>
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
};

const inputs = [
  {
    id: "quantidade",
    label: "Valor",
    type: "number",
    placeholder: "Insira o valor",
  },
  {
    id: "categoria_id",
    label: "Id da categoria",
    type: "select",
    placeholder: "Digite o id da categoria",
  },
  {
    id: "extrair_saldo",
    label: "Remover do saldo em conta?",
    type: "boolean",
    placeholder: "",
  },
];

export default InvestmentPostForm;
