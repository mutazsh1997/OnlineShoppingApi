using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Models.UserModel;
using System.Linq;
using System.Threading.Tasks;


namespace Api.Models
{
    public class Order
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

        [ScaffoldColumn(false)]
        [Column(TypeName = "decimal(18,4)")]
        public decimal Total { get; set; }

        [ScaffoldColumn(false)]
        public bool HasBeenShipped { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }


    }
}
