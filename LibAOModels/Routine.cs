using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LibAOModels
{
    public class Routine
    {
        public Int32 ID { get; set; }
        [Required]
        public string Name { get; set; }
        //public string Url { get; set; }
        [Required]
        public DateTime Createddate { get; set; }
        public Nullable<DateTime> Modifieddate { get; set; }
        public Nullable<DateTime> Deleteddate { get; set; }
        [Required]
        public Int32 AdminID { get; set; }

        public virtual Admin AdminCreated { get; set; }
        public virtual ICollection<Test> TestsUsingRoutine { get; set; }
        public virtual ICollection<RoutineImage> ImagesInRoutine { get; set; }
    }
}
