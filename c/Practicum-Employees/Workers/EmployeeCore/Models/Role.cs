using Employee.Core.Models;
using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace Workers.Core.Models
    {
        public class Role
        {
            [Key]
            public int Id { get; set; }
            public int EmployeeId { get; set; }
            public RoleName Name { get; set; }
            public bool IsAdmin { get; set; }
            public DateTime StartDate { get; set; } //בדיקה שזה אחרי התאריך היום
            //לא ניתן לבחור תפקיד פעמיים לאותו עובד

        }
    }
