"use client"

import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories"
import { useGetCategories } from "@/features/categories/api/use-get-categories"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { Loader2, Plus } from "lucide-react"
import { columns } from "@/app/(dashboard)/categories/columns"
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton"

const CategoriesPage = () => {
    const newCategory = useNewCategory();
    const deleteCategories = useBulkDeleteCategories();
    const categoriesQuery = useGetCategories();
    const categories = categoriesQuery.data || [];

    const isDisabled =
        categoriesQuery.isLoading || deleteCategories.isPending


    if (categoriesQuery.isLoading) {
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

    return (
        <div className="max-w-screen-4xl mx-auto w-full pb-10">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories
                    </CardTitle>
                    <Button onClick={newCategory.onOpen} size="sm">
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteCategories.mutate({ids})
                        }} 
                        disabled={isDisabled} 
                        columns={columns} 
                        data={categories} 
                        filterKey="name"/>
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage