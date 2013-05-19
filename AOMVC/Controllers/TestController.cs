﻿using LibAOBAL.orm;
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
using System.Web.Script.Serialization;

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

        [ValidateInput(false)]
        public ActionResult Finalize(string comment, string errors, string audio, string results, int? test_id) 
        {
            Test test = Adapter.TestRepository.GetByID(test_id);
            test.Comment = comment;
            test.Finisheddate = DateTime.UtcNow;
            test.Modifieddate = DateTime.UtcNow;
            Adapter.TestRepository.Update(test);
            Adapter.Save();

            //VISUAL ERRORS => e1: Interdentaal
            //              => e2: Addentaal
            Dictionary<int, string> errorList = new Dictionary<int, string>();
            var jss = new JavaScriptSerializer();
            dynamic data = jss.Deserialize<dynamic>(errors);
            foreach (var au in data)
            {
                string val = au.Value.ToString();
                string error_type;
                switch (val)
                {
                    case "e1":
                        error_type = "Interdentaal";
                        break;
                    case "e2":
                        error_type = "Addentaal";
                        break;
                    default:
                        error_type = "";
                        break;
                }
                if (!String.IsNullOrEmpty(error_type))
                {
                    errorList.Add(Convert.ToInt32(au.Key), error_type);
                }
            }
            errorList.OrderBy(a => a.Key);


            Dictionary<int, string> soundPaths = new Dictionary<int, string>();
            jss = new JavaScriptSerializer();
            data = jss.Deserialize<dynamic>(audio);
            foreach (var au in data)
	        {
                soundPaths.Add(Convert.ToInt32(au.Key), au.Value.ToString());
	        }
            soundPaths.OrderBy(a => a.Key);


            Dictionary<int, short> res = new Dictionary<int, short>();
            jss = new JavaScriptSerializer();
            data = jss.Deserialize<dynamic>(results);
            foreach (var au in data)
            {
                if (au.Value)
                {
                    res.Add(Convert.ToInt32(au.Key), 1);
                }
                else {
                    res.Add(Convert.ToInt32(au.Key), 0);
                }
            }
            res.OrderBy(a => a.Key);

            foreach (var sp in soundPaths)
	        {
		        Result result = new Result();
                result.TestID = test.ID;
                result.AudioSource = sp.Value + ".wav";
                result.Order = sp.Key;
                try
                {
                    string error = errorList[sp.Key].ToString();
                    Error err = Adapter.ErrorRepository.Find(e => e.Name.Equals(error), null).First();
                    result.Errors.Add(err);
                }
                catch (Exception)
                {
                    //NO ERRORS
                }
                result.Value = res[sp.Key];
	        }
            
            return Content("success");
        }
    }
}
