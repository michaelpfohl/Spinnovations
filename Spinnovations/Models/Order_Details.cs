using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Models
{
    public class Order_Details
    {
        public int Id { get; set; }
        public int Order_Id { get; set; }
        public int Product_Id { get; set; }
        public decimal Unit_Price { get; set; }
        public int Quantity { get; set; }
    }
}
