using LibAOBAL.orm;
using LibAOModels;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AOMVC.Controllers
{
    public class StatisticsController : Controller
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

        public JsonResult GetStats()
        {
            ICollection<Test> tests = Adapter.TestRepository.GetAll().Where(t => t.Analyseddate != null && t.ForStatistics==1).ToList();
         
            List<int> errorcount = new List<int>();

            foreach (var t in tests)
            {
                var count = 0;
                foreach (var r in t.Results)
                {
                    count += r.Errors.Count > 0 ? 1 : 0;
                }
                errorcount.Add(count);
            
            }
            errorcount.Sort();
            Dictionary<int, int> counts = new Dictionary<int, int>();
            List<int> uniques = new List<int>();
            foreach (var val in errorcount)
            {
                if (counts.ContainsKey(val))
                    counts[val]++;
                else
                {
                    counts[val] = 1;
                    uniques.Add(val);
                }
            }
            counts.OrderByDescending(i => i.Key);
            for (int i = counts.Last().Key; i > 0; i--)
            {
                int test;
                Boolean found = counts.TryGetValue(i, out test);
                if (!found)
                {
                    counts.Add(i, 0);
                }
            }
            var items = from pair in counts
                        orderby pair.Key ascending
                        select pair;
            List<StatisticResult> array = new List<StatisticResult>();
            
            foreach (var i in items)
	        {
                StatisticResult obj = new StatisticResult();
                obj.Count = i.Value;
                obj.Errors = i.Key;
                array.Add(obj);
                  
	        }
            return Json(new { array }, JsonRequestBehavior.AllowGet);
        }

    }

    public class StatisticResult
    {
        public int Count { get; set; }
        public int Errors { get; set; }
    }
}
