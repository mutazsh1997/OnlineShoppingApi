using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class ProductsToReturnList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ProductDescription { get; set; }
        public DateTime Created { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsDone { get; set; }
        public virtual categoryToReturn category { get; set; }
    }
}
