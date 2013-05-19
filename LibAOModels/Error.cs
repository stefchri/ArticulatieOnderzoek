using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LibAOModels
{
    public class Error
    {
        public Int64 ID { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual ICollection<Result> Results { get; set; }
    }
}
