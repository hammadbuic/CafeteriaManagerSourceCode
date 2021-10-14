using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Models
{
    public class AppConfig
    {
        public string JWTSecret { get; set; }
        public string Client_URL { get; set; }
    }
}
