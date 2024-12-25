import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { dataSubCategoriesAction, onSubmitExpenseAction, SubCategorieType } from "@/app/actions/dataFinanceActions";
import { useToastFeedback } from "@/hooks/useToastFeedback";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export const ExpensePostFormSchema = z.object({
  descricao: z.string().optional(),
  valor: z.string().optional(),
  data_completa: z.string().optional(),
  parcelas: z.string().optional(),
  subcategoria_id: z.string().optional(),
  fixo: z.boolean().optional(),
});

type FormData = z.infer<typeof ExpensePostFormSchema>;

const ExpensePostForm: React.FC<{ setOpen: any }> = ({ setOpen }) => {
  const [state, formAction] = useFormState(onSubmitExpenseAction, {
    message: "",
    success: false,
  });
  const { loading, setLoading } = useToastFeedback({ state });
  const [subCategories, setSubCategories] = React.useState<SubCategorieType[]>([]);

  const formRef = React.useRef<HTMLFormElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(ExpensePostFormSchema),
    defaultValues: {},
  });

  React.useEffect(() => {
    async function fetch() {
      try {
        const res = await dataSubCategoriesAction(2);
        setSubCategories(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetch();
  }, []);

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
                        form.setValue("subcategoria_id", value);
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
                  ) : item.type !== "textarea" ? (
                    <Input placeholder={item.placeholder} {...field} type={item.type} />
                  ) : (
                    <textarea
                      className="w-full border border-var-border-color placeholder:text-var-text-color-paragraph rounded-lg 
                      title-card-regular placeholder:title-card-regular focus:outline-none focus:border-[.0625rem] 
                      focus:border-white block px-3 py-1 placeholder:opacity-50 h-[7.375rem] bg-background 
                      autofill:bg-background focus:bg-var-background-principal"
                      placeholder={item.placeholder}
                      {...field}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" className="mt-4" loading={loading}>
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
};

const inputs = [
  {
    id: "descricao",
    label: "Descrição",
    type: "text",
    placeholder: "Insira a descrição",
  },
  {
    id: "valor",
    label: "Valor",
    type: "number",
    placeholder: "Insira o valor",
  },
  {
    id: "data_completa",
    label: "Data completa",
    type: "date",
    placeholder: "Digite a data",
  },
  {
    id: "parcelas",
    label: "Quantidade de parcelas",
    type: "text",
    placeholder: "Digite as parcelas",
  },
  {
    id: "subcategoria_id",
    label: "Id da subcategoria",
    type: "select",
    placeholder: "Digite o id da subcategoria",
  },
  {
    id: "fixo",
    label: "Gasto fixo?",
    type: "boolean",
    placeholder: "",
  },
];

export default ExpensePostForm;
