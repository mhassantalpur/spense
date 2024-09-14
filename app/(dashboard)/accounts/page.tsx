"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Plus } from "lucide-react"

import { Payment, columns } from "@/app/(dashboard)/accounts/columns"
import { DataTable } from "@/components/data-table";

const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 50,
        status: "success",
        email: "a@example.com",
      },
  ]

const AccountsPage = () => {
    const newAccount = useNewAccount();
    return (
        <div className="max-w-screen-4xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts Page
                    </CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable onDelete={() => {}} columns={columns} data={data} filterKey="email"/>
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage