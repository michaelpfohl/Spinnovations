using Spinnovations.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Spinnovations.Models
{
    public class Payment_Info
    {
        public int Id { get; set; }
        public Card Card_Company { get; set; }
        public string Card_Number { get; set; }
        public Month Expiration_Month { get; set; }
        public int Expiration_Year { get; set; }
        public int CVV { get; set; }
        public int Customer_Id { get; set; }
    }
}
