using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class Photo
    {
        [Key]
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public virtual Products Product { get; set; }
        public Guid ProductId { get; set; }
    }
}