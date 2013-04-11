using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LibAOBAL.security;
using LibAOModels;
using AOMVC.Models;
using LibAOBAL.orm;
using LibAOBAL.mail;
using System.Net.Mail;


namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class ChildController : Controller
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
            Admin admin = MVCExtensions.getCurrentAdmin();
            List<User> children = admin.Users.ToList();
            children = children.OrderBy(r => r.Surname).ToList(); 
            return View(children);
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(ChildRegisterModel model)
        {
            if (ModelState.IsValid)
            {
                Admin admin = MVCExtensions.getCurrentAdmin();
                User child = new User();
                child.Createddate = DateTime.UtcNow;
                child.DateOfBirth = model.DateOfBirth;
                child.Email = model.Email.Trim();
                child.Firstname = model.Firstname.Trim();
                child.Surname = model.Surname.Trim();
                child.Gender = model.Gender;
                child.AdminEnrolledID = admin.ID;
                Adapter.UserRepository.Insert(child);
                Adapter.Save();

                string mail = MVCExtensions.getCurrentAdmin().Email;
                MailManager mm = new MailManager();
                mm.EmailBodyHTML = "<p style='font-size:12px;font-style:italic;'>Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden daar er niet geantwoord zal worden.</p><h1>ArticulatieOnderzoek </h1><p>"+ model.Firstname + " " + model.Surname + " is geregistreerd door <a href='mailto:" + mail + "?Subject=ArticulatieOnderzoek%20Vraag'>" + HttpContext.User.Identity.Name + " </a></p>";
                MailAddress ma = new MailAddress("aonderzoek@gmail.com");
                mm.EmailFrom = ma;
                mm.EmailSubject = "ArticulatieOnderzoek - Registratie";
                MailAddress mas = new MailAddress(model.Email.Trim());
                List<MailAddress> masses = new List<MailAddress>();
                masses.Add(mas);
                mm.EmailTos = masses;
                mm.SmtpHost = "smtp.gmail.com";
                mm.SmtpPort = 587;
                mm.IsSSL = true;
                mm.SmtpLogin = "aonderzoek@gmail.com";
                mm.SmtpPassword = "qwerty123!";
                mm.SendMail();

                return RedirectToAction("Index", new { message="registerchild"});
            }
            else
            {
                ModelState.AddModelError("", "De opgegeven waarden zijn niet correct of compleet.");
            }
            return View(model);
        }

        public ActionResult Detail(int id)
        {
            User u = Adapter.UserRepository.GetByID(id);
            return View(u);
        }

        [HttpGet]
        public ActionResult Search(string query)
        {
            string test = query.ToLowerInvariant();
            Admin admin = MVCExtensions.getCurrentAdmin();
            List<User> children = admin.Users.ToList();
            List<User> result = children.FindAll(a => a.Surname.ToLowerInvariant().Contains(test));
            List<User> result2 = children.FindAll(a => a.Firstname.ToLowerInvariant().Contains(test));
            List<User> results = result.Union(result2).ToList();
            results = results.OrderBy(r => r.Surname).ToList(); 
            ViewBag.query = test;
            return View("Index", results);
        }

        
    }
}
