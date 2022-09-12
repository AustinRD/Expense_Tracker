/*
    Category                Subcategory

    Entertainment           

    Food                    Grocery
                            Restaurant
                            Fast-Food

    Health                  Hygiene
                            Dentist
                            Doctor
                            Insurance
                            Gym Membership
                            Vision


    Housing                 Rent
                            Mortgage
                            AirBnb
                            Hotel

    Pets

    Transportation          Car Loan
                            Motorcycle Loan
                            Car Insurance
                            Motorcycle Insurance
                            Vehicle Insurance (grouped)
                            Car Maintenance
                            Car Gas
                            Bus
                            Taxi
                            Uber
                            Train
                            Plane

    Utility                 Cell Phone
                            Gas
                            Electric
                            Water
                            Internet

    Miscellaneous           Loan
                            Clothing (shoes, shirts, etc)
                            Amazon Prime


*/

using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerBackend.Models
{
    public class TransactionCategory
    {
        [Key]
        public int Id { get; set; }

        [StringLength(30)]
        [Required(ErrorMessage = "Category Name Required")]
        public string Category { get; set; }

        [StringLength(50)]
        public string? Subcategory { get; set; }
    }
}
