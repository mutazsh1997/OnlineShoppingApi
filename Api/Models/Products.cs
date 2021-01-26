using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Products
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        public string ProductDescription { get; set; }
        public DateTime Created { get; set; }
        public bool IsDone { get; set; } = false;
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<ProductColors> Colors { get; set; }
        public virtual ICollection<ProductSizes> Sizes { get; set; }
        public virtual int CategoryId { get; set; }
        public virtual category category { get; set; }
    }
}
