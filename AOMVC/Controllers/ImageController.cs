using LibAOBAL.security;
using LibAOBAL.orm;
using LibAOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.IO;
using AOMVC.Models;

namespace AOMVC.Controllers
{
    [AOAuthorize]
    public class ImageController : Controller
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
            //CLEAR TEMP
            MVCExtensions.clearFolder(Server.MapPath("~/images/temp/"));
            MVCExtensions.clearFolder(Server.MapPath("~/sound/temp/"));

            Int32 id = MVCExtensions.getCurrentAdmin().ID;

            ICollection<Image> images = Adapter.ImageRepository.GetAll().ToList();
            images = images.Where(i => i.AdminCreatedID.Equals(id)).ToList().OrderBy(i => i.Name).ToList();
            foreach (Image im in images)
            {
                im.Phonetic = MVCExtensions.UnEscapePhonetic(im.Phonetic);
            }
            return View(images);
        }

        public ActionResult Edit(int id)
        {
            Image image = Adapter.ImageRepository.GetByID(id);
            image.Phonetic = MVCExtensions.UnEscapePhonetic(image.Phonetic);
            return View(image);
        }

        [HttpPost]
        public ActionResult Edit(string name, string id, string phonetic, string audioUrl, string sentence)
        {
            try
            {
                string tempPathAud = Server.MapPath("~/sound/temp/");
                string destPathAud = Server.MapPath("~/sound/");

                //Encode id from field
                byte[] b = Convert.FromBase64String(id);
                string idString = System.Text.Encoding.UTF8.GetString(b);
                Int32 ID = Convert.ToInt32(idString);

                //Encode phonetic transcription from string
                Encoding unicode = Encoding.Unicode;
                byte[] unicodeBytes = unicode.GetBytes(phonetic.Trim());
                string phonEncoded = Convert.ToBase64String(unicodeBytes);

                Image imagePrev = Adapter.ImageRepository.GetByID(ID);
                if (audioUrl != "")
                {
                    System.IO.File.Move(tempPathAud + audioUrl, destPathAud + audioUrl);
                    imagePrev.SoundUrl = audioUrl;
                }
                imagePrev.Modifieddate = DateTime.UtcNow;
                imagePrev.Name = name.Trim();
                imagePrev.Phonetic = phonEncoded;
                imagePrev.Sentence = sentence.Trim();
                Adapter.ImageRepository.Update(imagePrev);
                Adapter.Save();

                return Content("success");
            }
            catch (Exception)
            {
                return Content("error");
            }
            
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            Image image = Adapter.ImageRepository.GetByID(id);
            var admId = MVCExtensions.getCurrentAdmin().ID;
            if (admId == image.AdminCreatedID)
            {
                if (image.Routines.Count > 0)
                {
                    return Content("404");
                }
                return Content("200");
            }
            return Content("401");
        }

        [HttpPost]
        public ActionResult DeleteConfirmed(int id)
        {
            Image image = Adapter.ImageRepository.GetByID(id);
            Adapter.ImageRepository.Delete(image);
            Adapter.Save();
            return Content("200");
        }

        public ActionResult Upload()
        {
            //CLEAR TEMP
            MVCExtensions.clearFolder(Server.MapPath("~/images/temp/"));
            MVCExtensions.clearFolder(Server.MapPath("~/sound/temp/"));

            return View();
        }

        [HttpPost]
        [ActionName("Upload")]
        public ActionResult UploadImageResult()
        {
            string serverpath = Server.MapPath("~/images/temp/");

            string nameEncoded = "";
            HttpPostedFileBase im = null;

            if (Request.Files[0] != null)
            {
                im = Request.Files[0];

                string name = im.FileName + DateTime.Now.Millisecond.ToString();
                byte[] byt = System.Text.Encoding.UTF8.GetBytes(name);
                nameEncoded = Convert.ToBase64String(byt);
                string url = serverpath + nameEncoded + "." + im.ContentType.Split('/')[1];
                im.SaveAs(url);
                return Content(nameEncoded + "." + im.ContentType.Split('/')[1]);
            }
            ModelState.AddModelError("", "De files werden niet correct ontvangen.");
            return View();
        }

        [HttpPost]
        [ActionName("UploadToServer")]
        public ActionResult UploadFinal(string img, string name, string phonetic, string sentence, string audio)
        {
            string tempPathImg = Server.MapPath("~/images/temp/");
            string destPathImg = Server.MapPath("~/images/");
            string tempPathAud = Server.MapPath("~/sound/temp/");
            string destPathAud = Server.MapPath("~/sound/");

            if (img == "" || name == "" || phonetic == "" || sentence == "" || audio == "")
            {
                return Content("error");
            }
            Encoding unicode = Encoding.Unicode;
            byte[] unicodeBytes = unicode.GetBytes(phonetic.Trim());
            string phonEncoded = Convert.ToBase64String(unicodeBytes);
            Image im = new Image();
            im.Name = name.Trim();
            im.Phonetic = phonEncoded;
            im.AdminCreatedID = MVCExtensions.getCurrentAdmin().ID;
            im.Createddate = DateTime.UtcNow;
            im.Sentence = sentence.Trim();
            System.IO.File.Move(tempPathImg + img, destPathImg + img);
            System.IO.File.Move(tempPathAud + audio, destPathAud + audio);
            im.Url = img;
            im.SoundUrl = audio;
            Adapter.ImageRepository.Insert(im);
            Adapter.Save();
            return Content("saved");
        }

        [HttpPost]
        public ActionResult DeleteTempImage(string id, string audio)
        {
            string serverpath = Server.MapPath("~/images/temp/" + id);
            System.IO.File.Delete(serverpath);

            if (audio != "" && audio != null)
            {
                string sp = Server.MapPath("~/sound/temp/" + audio);
                System.IO.File.Delete(sp);
            }

            return Content("200");
        }

        [HttpPost]
        public ActionResult UploadSound()
        {
            string serverpath = Server.MapPath("~/sound/temp/");

            string nameEncoded = "";
            HttpPostedFileBase au = null;

            if (Request.Files[0] != null)
            {
                au = Request.Files[0];
                string name = au.FileName + DateTime.Now.Millisecond.ToString();
                byte[] byt = System.Text.Encoding.UTF8.GetBytes(name);
                nameEncoded = Convert.ToBase64String(byt);

                string ct = "";
                if (au.ContentType == "audio/x-wav")
                {
                    ct = "audio/wav";
                }
                else
                {
                    ct = au.ContentType;
                }
                string url = serverpath + nameEncoded + "." + ct.Split('/')[1];
                au.SaveAs(url);
                return Content(nameEncoded + "." + ct.Split('/')[1] +"," + au.ContentType);
            }

            return Content("error");
        }
    }

}
