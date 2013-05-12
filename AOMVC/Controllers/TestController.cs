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
using System.IO;
using System.Text;

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
        public ActionResult Test(int routine, int child, string kind)
        {
            ViewBag.Child = child;
            ViewBag.Routine = routine;
            Test test = new Test();
            test.AdminID = MVCExtensions.getCurrentAdmin().ID;
            test.Createddate = DateTime.UtcNow;
            test.Kind = kind;
            test.RoutineID = routine;
            test.UserID = child;

            Adapter.TestRepository.Insert(test);
            Adapter.Save();
            ViewBag.testid = test.ID;
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
                    {"Sound", p.Image.SoundUrl}
                })
            );
            JObject jo = new JObject();
            jo["Images"] = ImageArray;

            return Json(jo.ToString(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult UploadSound(string filename)
        {
            Test t = Adapter.TestRepository.GetByID(Convert.ToInt64(filename));
            //CREATE DIRECTORIES
            string dir = Server.MapPath("~/results/");
            if (!System.IO.Directory.Exists(dir + t.ID.ToString()))
            {
                System.IO.Directory.CreateDirectory(dir + t.ID.ToString());
            }
            string i = new Random().Next(999).ToString();
            string name = DateTime.UtcNow.Millisecond + i;

            string path = dir + t.ID.ToString() + "/" + name;

            using (FileStream output = System.IO.File.Create(path + ".wav"))
            {
                using (Stream input = Request.InputStream)
                {
                    byte[] buffer = new byte[input.Length];
                    int bytesRead;
                    while ((bytesRead = input.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        output.Write(buffer, 0, bytesRead);
                    }
                    output.Close();
                }
            }
            
            return Content(name);
        }
    }
}
