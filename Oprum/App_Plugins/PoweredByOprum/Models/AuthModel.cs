using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PoweredByOprum.Models
{
    public class AuthModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string MacroAlias { get; set; }

        public string RedirectUrl { get; set; }
    }
}