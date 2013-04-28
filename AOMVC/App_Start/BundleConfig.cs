//using Microsoft.Web.Optimization;
using System.Web;
using System.Web.Optimization;

namespace AOMVC
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(System.Web.Optimization.BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Content/bootstrap/js/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/phonetic").Include(
                        "~/Scripts/phonetic2.js"));

            bundles.Add(new ScriptBundle("~/bundles/upload").Include(
                        "~/Scripts/upload.js"));

            bundles.Add(new ScriptBundle("~/bundles/editImage").Include(
                        "~/Scripts/editImage.js"));

            bundles.Add(new ScriptBundle("~/bundles/alert").Include(
                        "~/Scripts/alerts.js"));

            bundles.Add(new ScriptBundle("~/bundles/images").Include(
                        "~/Scripts/images.js"));

            bundles.Add(new ScriptBundle("~/bundles/createRoutine").Include(
                        "~/Scripts/createRoutine.js"));

            bundles.Add(new ScriptBundle("~/bundles/test").Include(
                        "~/Scripts/jRecorder.js",
                        "~/Scripts/fullscreen.js",
                        "~/Scripts/test.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css"));

            bundles.Add(new StyleBundle("~/Content/phonetic/css").Include(
                "~/Content/phonetic/phonetic.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));

            bundles.Add(new StyleBundle("~/Content/themes/lightness").Include(
                   "~/Content/themes/ui-lightness/jquery-ui-1.10.2.custom.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                "~/Content/bootstrap/css/bootstrap.css",
                "~/Content/bootstrap/css/bootstrap-responsive.css"));


            bundles.Add(new StyleBundle("~/Content/bootstrapnoresponsive").Include(
                "~/Content/bootstrap/css/bootstrap.css"));

            

            bundles.Add(new StyleBundle("~/Content/Test").Include(
                "~/Content/Test.css"));
        }
    }
}