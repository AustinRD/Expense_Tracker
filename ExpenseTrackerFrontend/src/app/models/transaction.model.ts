export interface Transaction {
    id: number;
    userId: number;
    transactionAmount: number;
    transactionDate: string;
    transactionTypeId: number;
    transactionCategoryId: number;
    transactionDescription?: string;
    recipient?: string;
    isSubscription: boolean;
}