using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Workers.Core.Models;

namespace Workers
{
    public class Worker
    {
        [Key]
        public int id { get; set; }
        public string F_name { get; set; }
        public string L_name { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        [Column("BirthDay")]
        public DateTime BirthDay { get; set; }

        public bool Gender { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; } // רשימת התפקידים של העובד
    }

}
