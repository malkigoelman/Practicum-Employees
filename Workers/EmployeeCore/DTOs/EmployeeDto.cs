using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Workers;
using Workers.Core.Models;

namespace Employee.Core.DTOs
{
    public class EmployeeDto
    {
        //public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public List<Role> Roles { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
    }
}
