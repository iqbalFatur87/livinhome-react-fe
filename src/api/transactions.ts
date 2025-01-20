import {authedApi} from "../utils/api/client.ts";
import {TransactionDetail} from "../models/transactions.ts";

export const apiGetTransactionDetails = async (transactionId: string) => {
    return authedApi.get<TransactionDetail>(`/transaction/detail/${transactionId}`);
}