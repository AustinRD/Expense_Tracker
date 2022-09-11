namespace ExpenseTrackerBackend
{
    public class Transaction
    {
        public int Id { get; set; }

        // Required - Foreign Key - Cash Credit Debit Check Crypto
        public string TransactionType { get; set; }

        // Required - Decimal - Payment Amount
        public decimal TransactionAmount { get; set; }

        // Required - Month/Day - Date Payment was sent/given
        public string TransactionDate { get; set; }

        // Optional - Description - What was purchased?
        public string TransactionDescription { get; set; }

        // Optional - Who was paid?
        public string Recipient { get; set; }
    }
}
