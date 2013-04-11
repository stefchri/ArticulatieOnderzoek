using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace ExtensionMethods
{
    public static class Methods
    {
        
        public static Int64 NextInt64()
        {
           var bytes = new byte[sizeof(Int64)];    
           RNGCryptoServiceProvider Gen = new RNGCryptoServiceProvider();
           Gen.GetBytes(bytes);    
           return BitConverter.ToInt64(bytes , 0);        
        }
    }
}
