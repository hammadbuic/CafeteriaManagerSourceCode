using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Models.DTOs
{
    public class Profile
    {
        public string id { get; set; }
        public string fullname { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string role { get; set; }


    }
}
