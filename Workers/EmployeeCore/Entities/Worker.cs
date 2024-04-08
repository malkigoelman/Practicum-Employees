using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Workers.Core.Models;

namespace Workers
{
    public enum Gender { Male,Female}
    public class Worker
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; }
    }

}
