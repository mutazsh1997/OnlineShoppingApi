using Api.Models.UserModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForCreations
{
    public class ProductForCreation
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string ProductDescription { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public DateTime Created { get; set; }

        public ProductForCreation()
        {
            Created = DateTime.Now;
        }
    }
}
