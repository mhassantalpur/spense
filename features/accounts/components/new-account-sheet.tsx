import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AccountForm } from "./account-form";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
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
                <AccountForm onSubmit={() => {}} disabled={false}/>
            </SheetContent>
        </Sheet>
    )
}
