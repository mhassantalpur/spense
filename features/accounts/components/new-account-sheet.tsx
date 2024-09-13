import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertAccountSchema.pick({name: true});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
    
    const onSubmit = (values: FormValues) => {
        console.log({values});
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="bg-white space-y-4">
                <SheetHeader className="text-black">
                    <SheetTitle>
                        New Account
                        <SheetDescription>
                            Create a new account to track your transactions.
                        </SheetDescription>
                    </SheetTitle>
                </SheetHeader>
                <AccountForm onSubmit={onSubmit} disabled={false}/>
            </SheetContent>
        </Sheet>
    )
}
