using System.Collections.Generic;

namespace Api.Models
{
    public class category
    {
        public int Id { get; set; }
        public string categoryName { get; set; }
        public virtual ICollection<Products> products { get; set; }
    }

}