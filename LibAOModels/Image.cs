using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LibAOModels
{
    public class Image
    {
        public Int32 ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public string Phonetic { get; set; }
        [Required]
        public string Sentence { get; set; }
        [Required]
        public string SoundUrl { get; set; }
        [Required]
        public Int32 AdminCreatedID { get; set; }
        [Required]
        public DateTime Createddate { get; set; }
        public DateTime Modifieddate { get; set; }

        public virtual ICollection<RoutineImage> Routines { get; set; }
        public virtual Admin AdminCreated { get; set; }
    }
}
