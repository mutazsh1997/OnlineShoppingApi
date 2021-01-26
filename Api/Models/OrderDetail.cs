using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal ProductPrice { get; set; }
        public string ProductPhoto { get; set; }
        public string ProductName { get; internal set; }
        public int OrderId { get; set; }
        public virtual Order Order { get; internal set; }
    }
}