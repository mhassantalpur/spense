import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

import React from 'react'

export const NewAccountSheet = () => {
  return (
    <Sheet open>
        <SheetContent className="space-y-4">
            <SheetHeader>
                <SheetTitle>
                    New Account
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetTitle>
            </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}
