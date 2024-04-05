using Employee.Core.Models;
using Microsoft.EntityFrameworkCore;
using Workers.Core.Models;
using Workers;

public class DataContext : DbContext
{
    public DbSet<Worker> Workers { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<RoleName> RoleNames { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Employees");
    }
}
