using Employee.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Workers.Core.Models;

namespace Workers.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleName> RoleNames { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Employees")
                        ;//  .EnableRetryOnFailure(); // הוספת טיפול בשגיאות זמניות
            optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }
    }
}