using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace LibAOModels
{
    public class User
    {
        public Int64 ID { get; set; }
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Gender { get; set; }
        public Int32 Speech { get; set; }
        public Int32 Language { get; set; }
        public Int32 Hearing { get; set; }
        public Int32 Anamnesis { get; set; }
        public string Other { get; set; }
        [AllowHtml]
        public string Report { get; set; }
        [Required]
        public DateTime Createddate { get; set; }
        public DateTime Modifieddate { get; set; }
        public DateTime Deleteddate { get; set; }
        [Required]
        public Int32 AdminEnrolledID { get; set; }

        public virtual Admin AdminEnrolled { get; set; }
        public virtual ICollection<Test> TestsTaken { get; set; }
    }
}
