using System;

namespace Api.Data.DTOS.ForReturn
{
    public class OrderDetailToReturn
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductPhoto { get; set; }
        public string ProductName { get; internal set; }

    }
}