using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerBackend.Models
{
    public class TransactionDbContext : DbContext
    {
        public TransactionDbContext(DbContextOptions<TransactionDbContext> options) : base(options) { }
    
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionType> TransactionsTypes { get; set; }
        public DbSet<TransactionCategory> TransactionsCategories { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
