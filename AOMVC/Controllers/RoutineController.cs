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
        public ActionResult Create(string name)
        {
            return View();
        }

        public ActionResult Detail(int id)
        {
            var detail = Adapter.RoutineRepository.GetByID(id);
            return View(detail);
        }

        public ActionResult Edit(int id)
        {
            var edit = Adapter.RoutineRepository.GetByID(id);
            
            //VIEW NOT IMPLEMENTED

            return View(edit);
        }

        [HttpPost]
        public ActionResult Edit(Routine r)
        {
            var original = Adapter.RoutineRepository.GetByID(r.ID);
            
            //TO IMPLEMENT

            return View(r);
        }
    }
}
