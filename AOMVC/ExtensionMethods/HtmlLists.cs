using LibAOBAL.orm;
using LibAOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System.Web.Mvc
{
    public static class HtmlLists
    {
        public static IEnumerable<Gender> Genders = new List<Gender> { 
            new Gender {
                GenderValue = "m",
                GenderText = "Man"
            },
            new Gender {
                GenderValue = "f",
                GenderText = "Vrouw"
            }
        };

       
    }
}