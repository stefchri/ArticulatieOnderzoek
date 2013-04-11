using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibAOModels
{
    public class RoutineImage
    {
        public Int32 ImageId { get; set; }
        public Int32 RoutineId { get; set; }
        public Int32 ImageOrder { get; set; }

        public virtual Image Image { get; set; }
        public virtual Routine Routine { get; set; }
    }
}
