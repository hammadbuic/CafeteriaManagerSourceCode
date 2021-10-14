using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CafeteriaManageBackend.Models
{
    public class Order
    {
        public int id { get; set; }
        public string customer_name { get; set; }
        public string delivery_address { get; set; }
        public int order_quantity { get; set; }
        public DateTime order_time { get; set; }
        public Boolean status { get; set; }
        public int item_id { get; set; }
        public item item { get; set; }
    }
}
