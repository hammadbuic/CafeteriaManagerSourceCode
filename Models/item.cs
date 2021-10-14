using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Models
{
    public class item
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string quantity { get; set; }
        public double price { get; set; }
        public double actual_price { get; set; }
        public string img { get; set; }
        public List<Order> orders { get; set; }
    }
}
