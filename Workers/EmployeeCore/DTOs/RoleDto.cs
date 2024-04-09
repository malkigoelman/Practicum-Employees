using Employee.Core.Models;
using System;

namespace Employee.Core.DTOs
{
    public class RoleDto
    {
        public RoleName Name { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsAdmin { get; set; }
    }
}