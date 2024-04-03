using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Workers.Core.Models
{
    public class Role
    {
        string Name; //מתוך enum
        bool IsAdmin;
        DateOnly StartDate; //בדיקה שזה אחרי התאריך היום
        //לא ניתן לבחור תפקיד פעמיים לאותו עובד

    }
}
