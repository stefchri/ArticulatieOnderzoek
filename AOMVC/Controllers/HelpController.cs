using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AOMVC.Controllers
{
    public class HelpController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPdf()
        {
            string file = Server.MapPath("~/helpdocument/help.pdf");
            return File(file, "application/pdf", "AOHelp.pdf");
        }

    }
}
