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
using System.Web.Security;

namespace AOMVC.Controllers
{
    public class AccountController : Controller
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

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("LogOff");
            }
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                AOMembershipProvider mp = new AOMembershipProvider();
                if (mp.ValidateUser(model.Email, model.Password))
                {
                    System.Web.HttpContext.Current.Session["Email"] = model.Email;
                    HttpCookie cookie = new HttpCookie("Email", model.Email);
                    this.ControllerContext.HttpContext.Response.Cookies.Add(cookie);
                    FormsAuthentication.SetAuthCookie(model.Email, false);

                    Admin adm = Adapter.AdminRepository.Find(a => a.Email.Equals(model.Email), null).First();
                    adm.Lastloggedindate = DateTime.UtcNow;
                    Adapter.AdminRepository.Update(adm);
                    Adapter.Save();

                    if (returnUrl != null)
                    {
                        byte[] b = Convert.FromBase64String(returnUrl);
                        string url = System.Text.Encoding.UTF8.GetString(b);
                        url = url+ "?message=login";
                        return Redirect(url);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home", new { message = "login" });
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Het emailadres of het paswoord is niet geldig.");
                }
            }
            return View(model);
        }
        
        [AOAuthorize()]
        public ActionResult Register()
        {
            return View();
        }

        [AOAuthorize()]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult Register(RegisterModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var userModel = viewModel;
                AOMembershipProvider mp = new AOMembershipProvider();

                MembershipCreateStatus status;

                mp.CreateUserBetter(viewModel.Firstname, viewModel.Surname, viewModel.Gender, viewModel.Email, viewModel.Password, out status);
                if (status == MembershipCreateStatus.DuplicateEmail)
                {
                    ModelState.AddModelError("", "Emailadres heeft al een account.");
                }
                else if (status == MembershipCreateStatus.Success)
                {
                    string mail = MVCExtensions.getCurrentAdmin().Email;
                    MailManager mm = new MailManager();
                    mm.EmailBodyHTML = "<p style='font-size:12px;font-style:italic;'>Dit is een automatisch gegenereerd bericht. Gelieve niet te antwoorden daar er niet geantwoord zal worden.</p><h1>ArticulatieOnderzoek </h1><p>U bent geregistreerd door <a href='mailto:" + mail + "?Subject=ArticulatieOnderzoek%20Vraag'>" + HttpContext.User.Identity.Name + " </a></p>";
                    MailAddress ma = new MailAddress("aonderzoek@gmail.com");
                    mm.EmailFrom = ma;
                    mm.EmailSubject = "ArticulatieOnderzoek - Registratie";
                    MailAddress mas = new MailAddress(viewModel.Email);
                    List<MailAddress> masses = new List<MailAddress>();
                    masses.Add(mas);
                    mm.EmailTos = masses;
                    mm.SmtpHost = "smtp.gmail.com";
                    mm.SmtpPort = 587;
                    mm.IsSSL = true;
                    mm.SmtpLogin = "aonderzoek@gmail.com";
                    mm.SmtpPassword = "qwerty123!";
                    mm.SendMail();
                    return RedirectToAction("Index", "Home", new { message = "registered" });
           
                }
            }
            else
            {
                ModelState.AddModelError("", "De ingevulde gegevens zijn niet correct.");
            }
            return View(viewModel);
        }

        
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account", new { message = "logout" });
        }

        //ACTION TO DISPLAY PARTIAL VIEW INFORMATION ABOUT HOW MANY TESTS TO FINISH AND TO ANALYSE
        [AOAuthorize]
        public ActionResult AdminInfo()
        {
            Admin admin = MVCExtensions.getCurrentAdmin();
            int toAnalyse = admin.Tests.Where(t => !t.Analyseddate.HasValue).Count();
            int toFinish = admin.Tests.Where(t => !t.Finisheddate.HasValue).Count();
            ViewBag.toAnalyse = toAnalyse;
            ViewBag.toFinish = toFinish;
            return PartialView();
        }
    }
}
