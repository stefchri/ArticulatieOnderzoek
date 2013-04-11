using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using LibAOBAL.security;
using System.Security.Principal;
using System.Web.Security;
using System.Threading;
using System.Globalization;
using LibAOBAL.orm;
using System.Web.Script.Serialization;


namespace AOMVC
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            /* FORMATTERS 
            =======================================================================================================================
            */
            GlobalConfiguration.Configuration.Formatters.Clear();
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            IPrincipal principal = HttpContext.Current.User;
            if (principal != null && principal.Identity.IsAuthenticated && principal.Identity.AuthenticationType == "Forms")
            {
                //2. IDENTITY
                FormsIdentity fIndent = (FormsIdentity)principal.Identity;
                AOIdentity cIndent = new AOIdentity(fIndent.Ticket);
                AOPrincipal nPrincipal = new AOPrincipal(cIndent);
                HttpContext.Current.User = nPrincipal;
                Thread.CurrentPrincipal = nPrincipal;
            }
        }
    }
}