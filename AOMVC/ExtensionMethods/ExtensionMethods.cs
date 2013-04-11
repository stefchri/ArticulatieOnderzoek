using LibAOBAL.security;
using LibAOModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace System.Web.Mvc
{
    public static class MVCExtensions
    {
        public static Admin getCurrentAdmin()
        {
            AOIdentity ai = HttpContext.Current.User.Identity as AOIdentity;
            return ai.Admin;
        }

        public static void clearFolder(string FolderName)
        {
            DirectoryInfo dir = new DirectoryInfo(FolderName);

            foreach (FileInfo fi in dir.GetFiles())
            {
                fi.IsReadOnly = false;
                fi.Delete();
            }

            foreach (DirectoryInfo di in dir.GetDirectories())
            {
                clearFolder(di.FullName);
                di.Delete();
            }
        }

        public static string UnEscapePhonetic(string escapedhonetic) 
        {
            byte[] b = Convert.FromBase64String(escapedhonetic);
            string phonetic = Encoding.Unicode.GetString(b);
            return phonetic;
        }
    }
}