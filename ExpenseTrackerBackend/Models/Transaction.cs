/*
    TODO: Add support for automated recurring subscriptions.
    TODO: Add support for storage of receipt photo.
*/

using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerBackend.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "No User Provided")]
        public int UserId { get; set; }
        public User? User { get; set; }

        // Required - Decimal - Payment Amount
        [Required(ErrorMessage = "Transaction Amount Required.")]
        public decimal TransactionAmount { get; set; }

        // Required - Month/Day - Date Payment was sent/given
        [Required(ErrorMessage = "Transaction Date Required.")]
        public DateTime TransactionDate { get; set; } = DateTime.Now;

        // Required - Foreign Key - Cash Credit Debit Check Crypto
        [Required(ErrorMessage = "Transaction Type (Cash/Credit/Crypto/etc.) Required.")]
        public int TransactionTypeId { get; set; }
        public TransactionType? TransactionType { get; set; }

        // Food Entertainment Transportation Utility Housing
        [Required(ErrorMessage = "Transaction Category Required. If no category exists it can be changed later. Select 'Miscellaneous' for now.")]
        public int TransactionCategoryId {get; set; }
        public TransactionCategory? TransactionCategory { get; set; }

        // Optional - Description - What was purchased?
        [StringLength(200)]
        public string? TransactionDescription { get; set; }

        // Optional - Who was paid?
        [StringLength(200)]
        public string? Recipient { get; set; }

        // Optional - Tracks if the transaction is a subscription
        public bool IsSubscription { get; set; } = false;
    }
}
