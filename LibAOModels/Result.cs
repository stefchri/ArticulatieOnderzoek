using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibAOModels
{
    public class Result
    {
        public Int64 ID { get; set; }
        [Required]
        public Int32 Order { get; set; }
        public string AudioSource { get; set; }
        public string Phonetic { get; set; }
        public Int16 Value { get; set; }
        public Int64 TestID { get; set; }

        public virtual Test Test { get; set; }
        public virtual ICollection<Error> Errors { get; set; }
    }
}
