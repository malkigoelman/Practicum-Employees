using Employee.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employee.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public RoleName Name { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsAdmin { get; set; }
    }
}
