using Employee.Core.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Workers.Core.Models
{
    public class Role
    {
        public int RoleId { get; set; }
        public int EmployeeId { get; set; }
        public RoleName Name { get; set; }
        public int RoleNameId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime StartDate { get; set; }
    }
}
