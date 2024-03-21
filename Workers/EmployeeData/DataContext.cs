using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Workers.Core.Models;

namespace Workers.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=sample1_db")
                        ;//  .EnableRetryOnFailure(); // הוספת טיפול בשגיאות זמניות
            optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }
    }
}