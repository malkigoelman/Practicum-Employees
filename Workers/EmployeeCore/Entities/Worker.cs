using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Workers.Core.Models;

namespace Workers
{
    public enum Gender { Male,Female}
    public class Worker
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Tz is required")]
        public string Tz { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }
        [Required(ErrorMessage = "Birth day is required")]
        public DateTime BirthDay { get; set; }
        [Required(ErrorMessage = "Gender is required")]
        public Gender Gender { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; } // רשימת התפקידים של העובד
    }

}
