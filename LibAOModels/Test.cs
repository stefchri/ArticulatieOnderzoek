using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace LibAOModels
{
    public class Test
    {
        public Int64 ID { get; set; }
        [Required]
        public DateTime Createddate { get; set; }
        public Nullable<DateTime> Modifieddate { get; set; }
        public Nullable<DateTime> Deleteddate { get; set; }
        public Nullable<DateTime> Finisheddate { get; set; }
        public Nullable<DateTime> Analyseddate { get; set; }
        [Required]
        public Int32 AdminID { get; set; }
        [Required]
        public Int64 UserID { get; set; }
        [Required]
        public Int32 RoutineID { get; set; }
        [Required]
        public string Kind { get; set; }    //Normal, repeat, finish(sentence)
        [AllowHtml]
        public string Comment { get; set; }    

        public virtual Admin Admin { get; set; }
        public virtual User User { get; set; }
        public virtual Routine Routine { get; set; }
        public virtual ICollection<Result> Results { get; set; }
    }
}
