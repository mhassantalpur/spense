"use client"

import { useState } from "react"

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions"
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Loader2, Plus } from "lucide-react"
import { columns } from "@/app/(dashboard)/transactions/columns"
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton"
import { UploadButton } from "./upload-button"
import { ImportCard } from "./import-card"

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
};

const INITIAL_IMPORT_RESULSTS = {
    data: [],
    errors: [],
    meta: {}
}

const TransactionsPage = () => {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULSTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULSTS) => {
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULSTS);
        setVariant(VARIANTS.LIST);
    }  

    const newTransaction = useNewTransaction();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled =
        transactionsQuery.isLoading || deleteTransactions.isPending


    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-4xl mx-auto w-full pb-10">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <Skeleton className="h-8 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center">
                            <Loader2 className="size-6  text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <div className="text-black">
                    <ImportCard
                        data={importResults.data}
                        onCancel={onCancelImport}
                        onSubmit={() => {}} 
                    />
                </div>
            </>
        )
    }

    return (
        <div className="max-w-screen-4xl mx-auto w-full pb-10">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Transaction History
                    </CardTitle>
                    <div className="flex items-center gap-x-2">
                        <Button onClick={newTransaction.onOpen} size="sm">
                            <Plus className="size-4 mr-2" />
                            Add new
                        </Button>
                        <UploadButton
                            onUpload={onUpload}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey="payee"
                        disabled={isDisabled} 
                        columns={columns} 
                        data={transactions} 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteTransactions.mutate({ids})
                        }} 
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage