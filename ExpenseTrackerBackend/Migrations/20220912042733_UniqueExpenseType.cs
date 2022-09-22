using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseTrackerBackend.Migrations
{
    public partial class UniqueExpenseType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TransactionsTypes_Type",
                table: "TransactionsTypes",
                column: "Type",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TransactionsTypes_Type",
                table: "TransactionsTypes");
        }
    }
}
