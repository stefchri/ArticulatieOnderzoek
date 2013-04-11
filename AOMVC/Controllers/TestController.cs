using LibAOBAL.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class TestController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult ToFinish(int id)
        {
            return View();
        }

        public ActionResult ToAnalyse()
        {
            return View();
        }

        public ActionResult Test(long id)
        {
            return View();
        }

        public ActionResult Analyse(long id)
        {
            return View();
        }
    }
}
