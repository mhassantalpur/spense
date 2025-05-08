"use client"

import { useState } from 'react'
import { useMount } from 'react-use'
import { Button } from '@/components/ui/button'
import { useCreateLinkToken } from '@/features/plaid/api/use-create-link-token'

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);
  const createLinkToken = useCreateLinkToken();

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({data}) => {
        console.log({data})
      },
    })
  });

  return (
    <Button size="sm" >
      Connect
    </Button>
  )
}
