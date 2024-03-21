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
        public string Name { get; set; } //מתוך enum
        public bool IsAdmin { get; set; }
        //public DateOnly StartDate { get; set; } //בדיקה שזה אחרי התאריך היום
        //לא ניתן לבחור תפקיד פעמיים לאותו עובד

    }
}
