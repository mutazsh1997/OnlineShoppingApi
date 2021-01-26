using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ProductColors
    {
        [Key]
        public int Id { get; set; }
        public string Color { get; set; }
        public bool IsSelected { get; set; }
        public virtual Products Product { get; set; }
        public Guid ProductId { get; set; }
    }
}