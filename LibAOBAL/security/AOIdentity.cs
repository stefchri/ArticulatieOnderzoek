using LibAOModels;
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Runtime.Serialization;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using LibAOBAL.orm;

namespace LibAOBAL.security
{
   [Serializable]
    public class AOIdentity : MarshalByRefObject, IIdentity
    {
        #region PROPERTIES
        //TICKET
        private FormsAuthenticationTicket _ticket;
        public FormsAuthenticationTicket Ticket
        {
            get { return _ticket; }
            set { _ticket = value; }
        }
        private Admin _admin;
        public Admin Admin
        {
            get { return _admin; }
            set { _admin = value; }
        }
        #endregion

        #region IIDENTITY PROPERTIES
        public string AuthenticationType
        {
            get { return "Forms"; }
        }

        public bool IsAuthenticated
        {
            get { return true; }
        }

        public string Name
        {
            get { return Admin.Firstname + " " + Admin.Surname; }
        }

        public string Role 
        {
            get 
            {
                return "admin";
            } 
        }
        public string Email
        {
            get
            {
                return Admin.Email;
            }
        }
        #endregion

        #region CONSTRUCTOR
        public AOIdentity(FormsAuthenticationTicket ticket)
        {
            Ticket = ticket;
            SetAdmin();
        }
        private void SetAdmin()
        {
            try
            {
                UnitOfWork unitOfWork = new UnitOfWork();
                this._admin = unitOfWork.AdminRepository.Single(u => u.Email.Equals(Ticket.Name), null);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}