using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Workers;
using Workers.Core.Models;

namespace Employee.Api.Models
{
    public class EmployeePostModel
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Tz is required")]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "Tz must be 9 characters long")]
        public string Tz { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Birth day is required")]
        [DataType(DataType.Date)]
        public DateTime BirthDay { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public Gender Gender { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "At least one role is required")]
        public List<Role> Roles { get; set; }

        public static ValidationResult IsStartDateAfterBirthDay(DateTime startDate, ValidationContext context)
        {
            var model = (EmployeePostModel)context.ObjectInstance;

            if (startDate.Date <= model.BirthDay.Date)
            {
                return new ValidationResult("Start date must be after birth day");
            }

            return ValidationResult.Success;
        }
    }
}
