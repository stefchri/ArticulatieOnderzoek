using LibAOBAL.orm;
using LibAOBAL.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using LibAOModels;
using Newtonsoft.Json.Linq;

namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class TestController : Controller
    {
        #region UNITOFWORK
        private UnitOfWork _adapter = null;
        protected UnitOfWork Adapter
        {
            get
            {
                if (_adapter == null)
                {
                    _adapter = new UnitOfWork();
                }
                return _adapter;
            }
        }
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            var routs = Adapter.RoutineRepository.GetAll().OrderBy(r=>r.Name).ToList();
            return View(routs);
        }

        public ActionResult ToFinish(int id)
        {
            return View();
        }

        public ActionResult ToAnalyse()
        {
            return View();
        }


        public ActionResult Analyse(long id)
        {
            return View();
        }
        public ActionResult Test(int routine, int child)
        {
            ViewBag.Child = child;
            ViewBag.Routine = routine;

            return View();
        }

        public PartialViewResult Children()
        {
            var childr = Adapter.UserRepository.GetAll().OrderBy(c => c.Firstname).ThenBy(c=>c.Surname).ToList();
            return PartialView(childr);
        }

        
        public ActionResult GetRoutines(int id)
        {
            var rout = Adapter.RoutineImageRepository.Find(c => c.RoutineId.Equals(id),null).OrderBy(c => c.ImageOrder).ToList();
            
            JArray ImageArray = new JArray(
                rout.Select(p => new JObject{      
                    {"Name", p.Image.Name},
                    {"Sentence", p.Image.Sentence},
                    {"Url", p.Image.Url},
                    {"Order", p.ImageOrder},
                })
            );
            JObject jo = new JObject();
            jo["Images"] = ImageArray;

            return Json(jo.ToString(Newtonsoft.Json.Formatting.None), JsonRequestBehavior.AllowGet);
        }
    }
}
