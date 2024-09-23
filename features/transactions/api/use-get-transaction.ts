import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { converAmountFromMiliunits } from "@/lib/utils";

export const useGetTransaction = (id?:string) => {
    const query = useQuery({
        enabled: !!id, //only fetched if id exists
        queryKey: ["transaction", { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({
                param: {id},
            });
            if (!response.ok) {
                throw new Error("Failed to fetch transaction");
            }

            const { data } = await response.json();
            return {
                ...data,
                amount: converAmountFromMiliunits(data.amount)
            }
        }
    })
    return query;
}
