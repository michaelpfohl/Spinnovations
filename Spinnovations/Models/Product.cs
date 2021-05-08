using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public int Category_Id { get; set; }
        public double Price { get; set; }
        public int Creator_Id { get; set; }
        public int Quantity_In_Stock { get; set; }
        public bool Active { get; set; }
    }
}
