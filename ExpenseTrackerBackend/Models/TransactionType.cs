using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerBackend.Models
{
    public class TransactionType
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        [Required(ErrorMessage = "Transaction Type Required")]
        public string Type { get; set; }
    }
}
