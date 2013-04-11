using AOMVC.Models;
using LibAOBAL.mail;
using LibAOBAL.orm;
using LibAOBAL.security;
using LibAOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class ContactController : Controller
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

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Contact(string question)
        {
            try
            {
                string mail = MVCExtensions.getCurrentAdmin().Email;
                MailManager mm = new MailManager();
                mm.EmailBodyHTML = "<p style='font-size:12px;font-style:italic;'>Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden daar er niet geantwoord zal worden.</p><h1>ArticulatieOnderzoek </h1><p>Een vraag van <a href='mailto:" + mail + "?Subject=ArticulatieOnderzoek%20Vraag'>" + HttpContext.User.Identity.Name + " </a></p><p>" + question + "</p>";
                MailAddress ma = new MailAddress(mail);
                mm.EmailFrom = ma;
                mm.EmailSubject = "ArticulatieOnderzoek - nieuwe vraag";
                MailAddress mas = new MailAddress("aonderzoek@gmail.com");
                List<MailAddress> masses = new List<MailAddress>();
                masses.Add(mas);
                mm.EmailTos = masses;
                mm.SmtpHost = "smtp.gmail.com";
                mm.SmtpPort = 587;
                mm.IsSSL = true;
                mm.SmtpLogin = "aonderzoek@gmail.com";
                mm.SmtpPassword = "qwerty123!";
                mm.SendMail();
            }
            catch (Exception ex)
            {
                
                throw;
            }
            return RedirectToAction("Index", "Home", new {message = "question" });
        }

        public ActionResult Appointment(int? id)
        {
            ICollection<User> children = Adapter.UserRepository.GetAll().ToList();
            var query = from c in children select new SelectListItem() { Value = c.ID.ToString(), Text = c.Firstname + " " + c.Surname };
            if (id != null)
            {
                User u = Adapter.UserRepository.GetByID(id);
                query = from c in children select new SelectListItem(){ Value = c.ID.ToString(), Text = c.Firstname + " " + c.Surname, Selected = c.ID==id };
            }
            ViewBag.children = query;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Appointment(ChildAppointmentModel model, long children)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    User user = Adapter.UserRepository.GetByID(children);
                    string mail = MVCExtensions.getCurrentAdmin().Email;

                    MailManager mm = new MailManager();
                    mm.EmailBodyHTML = "<p style='font-size:12px;font-style:italic;'>Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden daar er niet geantwoord zal worden.</p><h1>ArticulatieOnderzoek </h1><p>Een nieuwe afspraak van <a href='mailto:" + mail + "?Subject=ArticulatieOnderzoek%20Afspraak'>" + HttpContext.User.Identity.Name + " </a>voor " + user.Firstname + " " + user.Surname + ". </p><p style='font-style:italic'>" + model.Message + "</p><p>Afspraak om <span class='font-weight:bold;'>" + model.Time.ToString() + "</span> op <span class='font-weight:bold;'>" + model.Date.ToString().Substring(0, model.Date.ToString().Length - 9) + " </span></p><hr /><p>Antwoord en/of bevestig deze afspraak via: <a href='mailto:" + mail + "?Subject=ArticulatieOnderzoek%20Afspraak'>" + HttpContext.User.Identity.Name + "(" + mail + ").</a></p>";
                    MailAddress ma = new MailAddress("aonderzoek@gmail.com");
                    mm.EmailFrom = ma;
                    mm.EmailSubject = "ArticulatieOnderzoek - nieuwe afspraak";
                    MailAddress mas = new MailAddress(user.Email);
                    List<MailAddress> masses = new List<MailAddress>();
                    masses.Add(mas);
                    mm.EmailTos = masses;
                    mm.SmtpHost = "smtp.gmail.com";
                    mm.SmtpPort = 587;
                    mm.IsSSL = true;
                    mm.SmtpLogin = "aonderzoek@gmail.com";
                    mm.SmtpPassword = "qwerty123!";
                    mm.SendMail();
                }
                catch (Exception ex)
                {

                    throw;
                }
                return RedirectToAction("Index", "Home", new { message = "appointment" });
            }
            else
            {
                ICollection<User> chil = Adapter.UserRepository.GetAll().ToList();
                var query = from c in chil select new SelectListItem() { Value = c.ID.ToString(), Text = c.Firstname + " " + c.Surname, Selected = c.ID == children };
                ViewBag.children = query;
            }
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

    }
}
