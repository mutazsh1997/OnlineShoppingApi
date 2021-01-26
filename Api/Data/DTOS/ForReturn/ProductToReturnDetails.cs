using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class ProductToReturnDetails
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
         public string ProductDescription { get; set; }
        public DateTime Created { get; set; }
        public string PhotoUrl { get; set; }
        public virtual categoryToReturn category { get; set; }
        public virtual ICollection<PhotosForReturn> Photos { get; set; }
        public virtual ICollection<ColorsToReturn> Colors { get; set; }
        public virtual ICollection<SizesToReturn> Sizes { get; set; }
    }
}
