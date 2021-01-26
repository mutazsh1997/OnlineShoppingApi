using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class CartItemToReturn
    {
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string ProductPhoto { get; set; }
        public string ProductName { get; set; }
        public decimal productPrice { get; set; }

        public DateTime DateCreated { get; set; }
        public string ProductId { get; set; }

    }
}
