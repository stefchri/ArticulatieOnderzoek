using LibAOModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AOMVC.Models
{
    public class ChildRegisterModel
    {
        [Required(ErrorMessage = "Voornaam verplicht in te vullen.")]
        [Display(Name = "voornaam")]
        [StringLength(32, ErrorMessage = "De {0} moet tenminste {2} karakters lang zijn.", MinimumLength = 3)]
        public string Firstname { get; set; }

        [Required(ErrorMessage = "Naam verplicht in te vullen.")]
        [Display(Name = "naam")]
        [StringLength(32, ErrorMessage = "De {0} moet tenminste {2} karakters lang zijn.", MinimumLength = 3)]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Emailadres verplicht in te vullen.")]
        [Display(Name = "emailadres")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Het emailadres is niet geldig.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Geboortedatum verplicht in te vullen.")]
        [Display(Name = "geboortedatum")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString="0:dd/mm/yy")]
        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Geslacht verplicht aan te duiden.")]
        [Display(Name = "geslacht")]
        public string Gender { get; set; }
    }

    public class ChildAppointmentModel
    {
        [Required(ErrorMessage = "Datum verplicht in te vullen.")]
        [Display(Name = "datum van afspraak")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Tijd verplicht in te vullen.")]
        [Display(Name = "tijd van afspraak")]
        [DataType(DataType.Time)]
        public string Time { get; set; }

        [Display(Name = "boodschap")]
        public string Message { get; set; }
    }
}