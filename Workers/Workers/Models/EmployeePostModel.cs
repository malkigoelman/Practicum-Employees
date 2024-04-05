using Workers;
using Workers.Core.Models;

namespace Employee.Api.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; }
    }
}
