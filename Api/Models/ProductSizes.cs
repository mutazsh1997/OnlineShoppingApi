using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ProductSizes
    {
        [Key]
        public int Id { get; set; }
        public string Size { get; set; }
        public bool IsSelected { get; set; }
        public virtual Products Product { get; set; }
        public Guid ProductId { get; set; }
    }
}