using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForCreations
{
    public class CartForCreation
    {
        public int Quantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string ProductPhoto { get; set; }
        public string ProductName { get; set; }
        public decimal productPrice { get; set; }

        public DateTime DateCreated { get; set; }

        public CartForCreation()
        {
            this.DateCreated = DateTime.Now;
        }
    }
}
