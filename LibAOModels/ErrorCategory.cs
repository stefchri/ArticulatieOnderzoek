using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibAOModels
{
    public class ErrorCategory
    {
        public Int32 ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Error> ErrorsInCategory { get; set; }
    }
}
