using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Data.DTOS.ForReturn
{
    public class OrderToReturn
    {
        [Key]
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public decimal Total { get; set; }

        [ScaffoldColumn(false)]
        public bool HasBeenShipped { get; set; }

        public virtual ICollection<OrderDetailToReturn> OrderDetails { get; set; }
    }
}
