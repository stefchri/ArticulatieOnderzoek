using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LibAOBAL.security;
using LibAOModels;
using LibAOBAL.orm;

namespace AOMVC.Controllers
{
    [AOAuthorize()]
    public class HomeController : Controller
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
            Admin ad = MVCExtensions.getCurrentAdmin();
            ViewBag.Name = ad.Firstname + " " + ad.Surname;
            return View();
        }
        public PartialViewResult ToAnalyse()
        {
            Admin ad = MVCExtensions.getCurrentAdmin();
            List<Test> testsA = Adapter.TestRepository.GetAll().ToList();
            testsA = testsA.Where(t => t.AdminID == ad.ID && t.Analyseddate == null && t.Finisheddate != null && t.Deleteddate == null).OrderBy(t => t.Finisheddate).Take(4).ToList();
            return PartialView(testsA);
        }

        public PartialViewResult ToFinish()
        {
            Admin ad = MVCExtensions.getCurrentAdmin();
            List<Test> testsA = Adapter.TestRepository.GetAll().ToList();
            testsA = testsA.Where(t => t.AdminID == ad.ID && t.Analyseddate == null && t.Finisheddate == null && t.Deleteddate == null).OrderBy(t => t.Createddate).Take(4).ToList();
            return PartialView(testsA);
        }

        public PartialViewResult RecentlyTestedChildren()
        {
            Admin ad = MVCExtensions.getCurrentAdmin();
            List<User> user = Adapter.UserRepository.GetAll().ToList();
            user = user.Where(t => t.AdminEnrolledID == ad.ID && t.Deleteddate == DateTime.MinValue).OrderBy(t => t.TestsTaken.OrderByDescending(e => e.Finisheddate).First().Finisheddate).Take(4).ToList();
            return PartialView(user);
        }

    }
}
