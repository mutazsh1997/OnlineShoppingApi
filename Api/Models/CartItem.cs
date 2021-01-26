using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class CartItem
    {
        [Key]
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string ProductPhoto { get; set; }
        public string ProductName { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal ProductPrice { get; set; }
        public DateTime DateCreated { get; set; }
        public Guid ProductId { get; set; }
        public virtual Cart Cart { get; set; }
        public string CartId { get; set; }
    }
}
