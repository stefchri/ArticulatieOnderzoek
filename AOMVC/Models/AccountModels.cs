using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AOMVC.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage="Emailadres is verplicht.")]
        [Display(Name = "email")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Geen geldig e-mailadres.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Paswoord is verplicht.")]
        [DataType(DataType.Password)]
        [Display(Name = "paswoord")]
        [StringLength(128, ErrorMessage = "Het {0} moet tenminste {2} karakters lang zijn.", MinimumLength = 6)]
        public string Password { get; set; }
    }

    public class RegisterModel
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
        [EmailAddress(ErrorMessage =  "Het emailadres is niet geldig.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Paswoord verplicht in te vullen.")]
        [DataType(DataType.Password)]
        [Display(Name = "paswoord")]
        [StringLength(128, ErrorMessage = "Het {0} moet tenminste {2} karakters lang zijn.", MinimumLength = 6)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Paswoord verplicht te verifiëren.")]
        [DataType(DataType.Password)]
        [Display(Name = "paswoord verificatie")]
        [Compare("Password", ErrorMessage="De paswoorden komen niet overeen.")]
        public string PasswordCheck { get; set; }
        
        [Required(ErrorMessage="Geslacht verplicht aan te duiden.")]
        [Display(Name = "geslacht")]
        public String Gender { get; set; }
    }
}