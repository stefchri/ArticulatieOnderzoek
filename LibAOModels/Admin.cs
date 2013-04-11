using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAnnotationsExtensions;
using System.ComponentModel.DataAnnotations;

namespace LibAOModels
{
    public class Admin
    {
        public Int32 ID { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PasswordSalt { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime Createddate { get; set; }
        public Nullable<DateTime> Modifieddate { get; set; }
        public Nullable<DateTime> Deleteddate { get; set; }
        public Nullable<DateTime> Lastloggedindate { get; set; }

        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<Test> Tests { get; set; }
        public virtual ICollection<Routine> Routines { get; set; }
        public virtual ICollection<Image> Images { get; set; }
    }
}
