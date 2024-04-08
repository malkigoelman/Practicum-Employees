using System;
using System.ComponentModel.DataAnnotations;

namespace Employee.Api.Models
{
    public class RolePostModel
    {
        [Required(ErrorMessage = "Role name ID is required")]
        public int RoleNameId { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "IsAdmin is required")]
        public bool IsAdmin { get; set; }
    }
}
