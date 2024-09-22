import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { AmountInput } from "@/components/amount-input";

import { insertTransactionSchema } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional()
});

const apiSchema = insertTransactionSchema.omit({id: true});

type FormValues = z.input<typeof formSchema>;
type apiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: apiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: {label: string; value: string}[];
    categoryOptions: {label: string; value: string}[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm =({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        console.log({ values })
    };

    const handleDelete = () => {
        onDelete?.()
    };




    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField 
                    name="date" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="accountId" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black">
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an account"
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="categoryId" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black">
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select a category"
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="payee" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black">
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="Add a payee"
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="payee" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black">
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field} 
                                    disabled={disabled}
                                    placeholder="0.00"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="notes" 
                    control={form.control} 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-black">
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ''}
                                    disabled={disabled}
                                    placeholder="Optional Notes" 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="w-full" disabled={disabled}>
                    {id ? "Save changes":"Create account"}
                </Button>
                {!!id && <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full text-black" variant="outline">
                    <Trash className="text-black size-4 mr-2" />
                    Delete account
                </Button>}
            </form>
        </Form>
    )
}