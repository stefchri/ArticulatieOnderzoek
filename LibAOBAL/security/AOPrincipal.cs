using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;

namespace LibAOBAL.security
{
    [Serializable]
    public class AOPrincipal : MarshalByRefObject, IPrincipal
    {
        #region IPrincipal Members
        private AOIdentity _identity;
        public IIdentity Identity
        {
            get { return _identity; }
            set { _identity = (AOIdentity)value; }
        }
        public string[] GetRoles(string userName)
        {
            try
            {
                return Roles.GetRolesForUser(userName);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        public bool IsInRole(string role)
        {
            try
            {
                return Roles.IsUserInRole(role);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        #endregion
        #region CONSTRUCTOR
        public AOPrincipal(AOIdentity cIndent)
        {
            this.Identity = cIndent;
        }
        #endregion        
    }
}

