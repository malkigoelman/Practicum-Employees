using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Workers.Core.Models;

namespace Workers.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Role>()
            //.HasOne(r => r.Worker)
            //.WithMany(w => w.Roles)
            //.HasForeignKey(r => r.EmployeeId);

            //modelBuilder.Entity<Worker>()
            //    .HasMany(w => w.Roles)
            //    .WithOne(r => r.Worker)
            //    .HasForeignKey(r => r.EmployeeId);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Employees")
                        ;//  .EnableRetryOnFailure(); // הוספת טיפול בשגיאות זמניות
            optionsBuilder.LogTo(m => Debug.WriteLine(m));
        }
    }
}