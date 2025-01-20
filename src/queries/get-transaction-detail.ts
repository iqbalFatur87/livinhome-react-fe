import {useQuery} from "@tanstack/react-query";
import {apiGetTransactionDetails} from "../api/transactions.ts";

type GetTransactionDetailArgs = {
    transactionId: string | undefined;
}

export function useQueryGetTransactionDetail({ transactionId }: GetTransactionDetailArgs) {
    return useQuery({
        queryKey: ['transaction-detail',transactionId ],
        queryFn: async () => {
            if (!transactionId) throw new Error('Transaction ID is required');

            return await apiGetTransactionDetails(transactionId);
        }
    })
}