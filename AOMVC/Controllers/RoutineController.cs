using AOMVC.Models;
using LibAOBAL.orm;
using LibAOBAL.security;
using LibAOModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class RoutineController : Controller
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
            int id = MVCExtensions.getCurrentAdmin().ID;
            var routines = Adapter.RoutineRepository.GetAll().ToList();
            routines = routines.Where(r => r.AdminID.Equals(id)).OrderBy(r => r.Name).ToList();
            return View(routines);
        }

        public ActionResult Create()
        {
            var imgs = Adapter.ImageRepository.GetAll().OrderBy(i => i.Name).ToList();
            return View(imgs);
        }

        [HttpPost]
        public ActionResult Create(string name, string imges)
        {
            if (name != "" && imges != "")
            {
                string[] im = imges.Split(',');
                List<int> images = new List<int>();
                foreach (var i in im)
                {
                    images.Add(Convert.ToInt32(i));
                }

                Routine r = new Routine();
                r.Name = name;
                r.AdminID = MVCExtensions.getCurrentAdmin().ID;
                r.Createddate = DateTime.UtcNow;
                
                
                Adapter.RoutineRepository.Insert(r);
                Adapter.Save();

                var it = 1;
                foreach (var img in images)
	            {
                    RoutineImage ri = new RoutineImage();
                    ri.ImageId= img;
                    ri.RoutineId = r.ID;
                    ri.ImageOrder = it;
                    Adapter.RoutineImageRepository.Insert(ri);
                    Adapter.Save();
                    r.ImagesInRoutine.Add(ri);
                    it++;
	            }
                Adapter.Save();

                return Content("200");
            }
            return Content("401");
        }


        public ActionResult Edit(int id)
        {
            var edit = Adapter.RoutineRepository.GetByID(id);
            return View(edit);
        }

        [HttpPost]
        public ActionResult Edit(string name, string imgs, string id)
        {
            if (name != "" && imgs != "" && id != "")
            {
                string[] im = imgs.Split(',');
                List<int> images = new List<int>();
                foreach (var i in im)
                {
                    images.Add(Convert.ToInt32(i));
                }

                Routine r = Adapter.RoutineRepository.GetByID(Convert.ToInt32(id));
                r.Name = name;
                r.Modifieddate = DateTime.UtcNow;
                Adapter.RoutineRepository.Update(r);
                Adapter.Save();
                List<RoutineImage> delete = r.ImagesInRoutine.ToList();

                foreach (var rim in delete)
                {
                    Adapter.RoutineImageRepository.Delete(rim);
                }


                Adapter.Save();

                var it = 1;
                foreach (var img in images)
                {
                    RoutineImage ri = new RoutineImage();
                    ri.ImageId = img;
                    ri.RoutineId = r.ID;
                    ri.ImageOrder = it;
                    Adapter.RoutineImageRepository.Insert(ri);
                    Adapter.Save();
                    r.ImagesInRoutine.Add(ri);
                    it++;
                }
                Adapter.Save();

                return Content("200");
            }
            return Content("401");
        }
    }
}
