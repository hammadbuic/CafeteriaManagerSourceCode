using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Models.DTOs
{
    public class ItemInputModel
    {
        public string name { get; set; }
        public string description { get; set; }
        public string quantity { get; set; }
        public double price { get; set; }
        public double actual_price { get; set; }
        public IFormFile img { get; set; }
    }
}
